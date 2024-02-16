import { toast, ToastContent } from "react-toastify";

type ToastType = "success" | "error" | "warning" | "info";
type ReactText = string | number;
class ToastsManager {
  private static _currentToastId: ReactText | null = null;

  static showToast(type: ToastType, content: ToastContent): void {
    if (this._currentToastId && toast.isActive(this._currentToastId)) {
      toast.update(this._currentToastId, {
        type,
        render: content,
      });

      return;
    }

    this._currentToastId = toast[type](content);
  }
}

export default ToastsManager;
