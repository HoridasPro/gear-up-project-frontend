import { Button } from "@/components/ui/button";

export default async function HomePage() {
  return (
    <div>
      <h2>This is new project</h2>
      <Button size={"sm"} variant={"destructive"}>
        click me
      </Button>
    </div>
  );
}
