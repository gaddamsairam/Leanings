"use client";

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import BackButton from "./backButton";
import Header from "./header";
import Social from "./social";

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backbuttonHref,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backbuttonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
