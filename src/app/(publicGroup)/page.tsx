import { Button } from "@/components/ui/button";
import { getMe } from "@/server/getMe";
 

export default async function HomePage() {
  const user = await getMe();
  console.log( user);
  return (
    <div>
      <h2>This is new project</h2>
      <Button size={"sm"} variant={"destructive"}>
        click me
      </Button>
    </div>
  );
}
