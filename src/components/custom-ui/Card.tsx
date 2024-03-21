import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CardWrapper({
  title,
  description,
  content,
  footer,
}: {
  title: string;
  description?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <>
      <Card>
        <CardHeader className='text-center mb-4'>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{content}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </>
  );
}
