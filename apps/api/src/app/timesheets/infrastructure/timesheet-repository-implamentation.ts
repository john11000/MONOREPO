import { Injectable } from '@nestjs/common';
import {
  Timesheet as TimesheetFromDB,
  TimesheetEntry,
  Prisma,
} from '@prisma/client';

import { PrismaService } from '@ocmi/api/libs/database/prisma/prisma.service';

import { Timesheet, TimesheetEntryProperties } from '../domain/timesheet';
import { TimesheetRepository } from '../domain/timesheet.repository';
import { TimesheetFactory } from '../domain/timesheet.factory';
import { formatDate } from '@ocmi/api/libs/utils';

type TimesheetEntity = TimesheetFromDB & {
  entries: TimesheetEntry[];
};

@Injectable()
export class TimesheetRepositoryImplementation implements TimesheetRepository {
  constructor(
    private readonly timesheetFactory: TimesheetFactory,
    private readonly prisma: PrismaService,
  ) {}
  async save(timesheet: Timesheet): Promise<void> {
    await this.prisma.timesheet.create({
      data: this.modelToEntity(timesheet),
    });
  }

  async findAll(customerId?: string): Promise<Timesheet[]> {
    const where: Prisma.TimesheetWhereInput = {};

    if (customerId) {
      where.customerId = customerId;
    }

    const timesheets = await this.prisma.timesheet.findMany({
      where,
      include: {
        entries: true,
      },
    });

    return timesheets.map(this.entityToModel.bind(this));
  }

  async findById(id: string): Promise<Timesheet | null> {
    const timesheet = await this.prisma.timesheet.findUnique({
      where: {
        id,
      },
      include: {
        entries: true,
      },
    });

    if (!timesheet) {
      return null;
    }

    return this.entityToModel(timesheet);
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.prisma.timesheet.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async addNotes(id: string, notes: string): Promise<void> {
    await this.prisma.timesheet.update({
      where: {
        id,
      },
      data: {
        notes,
      },
    });
  }

  private modelToEntity(timesheet: Timesheet): Prisma.TimesheetCreateInput {
    return {
      id: timesheet.getId(),
      grossPayroll: timesheet.getGrossPayroll(),
      status: timesheet.getStatus(),
      payPeriodStart: new Date(timesheet.getPayPeriodStart()),
      payPeriodEnd: new Date(timesheet.getPayPeriodEnd()),
      checkDate: new Date(timesheet.getCheckDate()),
      customer: {
        connect: {
          id: timesheet.getCustomerId(),
        },
      },
      entries: {
        createMany: {
          data: timesheet.getTimesheetEntries().map(this.entryModelToEntity),
        },
      },
    };
  }

  private entryModelToEntity(
    entry: TimesheetEntryProperties,
  ): Prisma.TimesheetEntryCreateManyTimeSheetInput {
    return {
      employeeName: entry.employeeName,
      grossWages: entry.grossWages,
      payRate: entry.payRate,
      payType: entry.payType,
      hours: entry.hours,
    };
  }

  private entityToModel(timesheet: TimesheetEntity): Timesheet {
    return this.timesheetFactory.reconstituteTimesheet({
      id: timesheet.id,
      grossPayroll: timesheet.grossPayroll.toNumber(),
      status: timesheet.status,
      payPeriodStart: formatDate(timesheet.payPeriodStart),
      payPeriodEnd: formatDate(timesheet.payPeriodEnd),
      checkDate: formatDate(timesheet.checkDate),
      customerId: timesheet.customerId,
      notes: timesheet.notes,
      timesheetEntries: timesheet.entries.map((entry) => ({
        employeeName: entry.employeeName,
        grossWages: entry.grossWages.toNumber(),
        payRate: entry.payRate.toNumber(),
        payType: entry.payType,
        hours: entry.hours?.toNumber() || null,
      })),
    });
  }
}
