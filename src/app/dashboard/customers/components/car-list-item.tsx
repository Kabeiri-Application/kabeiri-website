import { useRouter } from "next/navigation";

import { Car } from "@/db/app.schema";

export default function CarListItem(car: Car) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/cars/${car.id}`)}
      key={car.id}
      className="cursor-pointer rounded-lg border border-gray-200 p-2 pb-2 transition-transform duration-200 hover:scale-102 hover:bg-gray-50"
    >
      <p>
        <span className="font-medium">Make: </span>
        {car.make}
      </p>
      <p>
        <span className="font-medium">Model: </span>
        {car.model}
      </p>
      <p>
        <span className="font-medium">Year: </span>
        {car.year}
      </p>
    </div>
  );
}
