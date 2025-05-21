import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Service } from '@/db/app.schema';

export function ServiceCard(service: Service) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/dashboard/services/${service.id}`)}
      key={service.id}
      className='group relative cursor-pointer transition-all hover:scale-[1.1]'>
      <CardHeader>
        <CardTitle>{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p>Description: {service.description}</p>
          <p>{`Price: $${service.price}`}</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
