import { toast } from '@zerodevx/svelte-toast';

export const handleError = (errors: any, defaultMessage: string | null = null) => {
  let errorMessage;
  
  if (defaultMessage) {
    errorMessage = defaultMessage;
  } else {
    const keys = Object.keys(errors[0].extensions);
    errorMessage = `${keys[0]} ${errors[0].extensions[keys[0]]}`;
  }

  toast.push(errorMessage);
}
