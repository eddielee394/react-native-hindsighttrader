import { Toast } from 'native-base';

class ErrorHandler {
  /**
   * Renders a user notification when an error occurs;
   * @param {object} error
   * @param callback
   */
  renderErrorNotification = (error, callback = null) => {
    const { message, data } = error;
    const toast = Toast.show({
      text: `There was an error processing your request.  \nError message:${message}. ${data}`,
      type: 'warning',
      position: 'bottom',
      duration: 5000,
      onClose: reason => typeof callback === 'function' && callback(),
    });
    console.log(error);
    return toast;
  };
}
const instance = new ErrorHandler();
export default instance;
