import Image from "next/image";
import { Gear } from "@/type/type-gear";
import { RentSection } from "./rentSection";

type Props = {
  gear: Gear;
};

export const GearDetailsPage = ({ gear }: Props) => {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <div className="relative h-[450px]">
          <Image
            src={gear.gearItemImage}
            alt={gear.title}
            fill
            unoptimized
            className="rounded-xl object-cover"
          />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <Image
            src={gear.gearItemImage}
            width={150}
            height={100}
            unoptimized
            alt="image"
            className="rounded-lg"
          />
          <Image
            src={gear.gearItemImage}
            width={150}
            height={100}
            unoptimized
            alt="image"
            className="rounded-lg"
          />
          <Image
            src={gear.gearItemImage}
            width={150}
            height={100}
            unoptimized
            alt="image"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-5">
        <h1 className="text-4xl font-bold">{gear.title}</h1>

        <p className="text-gray-600">{gear.description}</p>

        <div className="space-y-2">
          <p>
            Category:
            <span className="ml-2 font-semibold">{gear.category}</span>
          </p>

          <p>
            Brand:
            <span className="ml-2 font-semibold">{gear.brand}</span>
          </p>

          <p>
            Available Quantity:
            <span className="ml-2 font-semibold">{gear.quantity}</span>
          </p>

          <p className="text-3xl font-bold text-green-600">${gear.price}/day</p>
        </div>

        <div className="rounded-xl border p-5">
          <h2 className="text-xl font-bold">Provider Information</h2>
          <p className="mt-2">Provider ID: {gear.providerId}</p>
        </div>

        
        <RentSection gear={gear} />
      </div>
    </div>
  );
};

 