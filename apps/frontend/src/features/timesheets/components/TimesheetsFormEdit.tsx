import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTimesheetsContext } from "../context/Timesheets.context";
import { ITimesheets, PayTypeEnum } from "../models/Timesheets.type";
import { FIELD_REQUIRED_MESSAGE } from "@/constants/app.constants";

type props = {
  register: UseFormRegister<ITimesheets>;
  errors: FieldErrors<ITimesheets>;
};

export const TimesheetsFormEdit: React.FC<props> = ({ register, errors }) => {
  const { isEdit, groupToEdit } = useTimesheetsContext();
  return (
    <Container>
      <Grid container spacing={2} width="100%" margin="auto">
        <Grid
          item
          sx={{
            display: isEdit ? "block" : "none",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <FormControl fullWidth>
            <TextField
              defaultValue={groupToEdit?.id}
              variant="outlined"
              disabled
              size="small"
              label="Id"
              {...register("id")}
            />
          </FormControl>
        </Grid>

        <Grid item sx={{ width: { xs: "100%", md: isEdit ? "50%" : "100%" } }}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.name}
              defaultValue={groupToEdit?.name}
              helperText={
                errors.name?.type === "required" && FIELD_REQUIRED_MESSAGE
              }
              label="Name"
              variant="outlined"
              size="small"
              {...register("name", { required: true })}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: { xs: "100%", md: isEdit ? "50%" : "100%" } }}>
        <FormControl fullWidth error={!!errors.payType} size="small">
          <InputLabel id="payType-label">Pay Type</InputLabel>
          <Select
            labelId="payType-label"
            id="payType"
            defaultValue={groupToEdit?.payType}
            variant="outlined"
            {...register("payType", { required: true })}
          >
            <MenuItem value={PayTypeEnum.HOURLY}>{PayTypeEnum.HOURLY}</MenuItem>
            <MenuItem value={PayTypeEnum.SALARY}>{PayTypeEnum.SALARY}</MenuItem>
          </Select>
          {errors.payType?.type === "required" && (
            <FormHelperText>{FIELD_REQUIRED_MESSAGE}</FormHelperText>
          )}
        </FormControl>
        </Grid>
        <Grid item sx={{ width: { xs: "100%", md: isEdit ? "50%" : "100%" } }}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.payRate}
              defaultValue={groupToEdit?.payRate}
              helperText={
                errors.payRate?.type === "required" && FIELD_REQUIRED_MESSAGE
              }
              label="Pay Rate"
              variant="outlined"
              size="small"
              {...register("payRate", { required: true })}
            />
          </FormControl>
        </Grid>
        {isEdit && <Grid item xs={12} md={6}></Grid>}
      </Grid>
    </Container>
  );
};
