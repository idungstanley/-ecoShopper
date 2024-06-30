import { toast } from 'react-toastify';

const Notify = ({ type, text }: { type: string; text: string }) => {
  switch (type) {
    case 'success':
      toast.success(text);
      break;
    case 'error':
      toast.error(text?.toString());
      break;
    default:
      break;
  }
};

export default Notify;
