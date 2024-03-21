import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';

export default function FormInput(props: any) {
  const { label, required, control, name, placeholder, type } = props;
  return (
    <>
      <FormItem>
        <FormLabel>
          {label}
          {required && '*'}
        </FormLabel>
        <FormControl>
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <Input type={type} placeholder={placeholder} {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </>
  );
}
