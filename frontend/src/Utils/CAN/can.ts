import { AbilityBuilder, Ability } from "@casl/ability";
import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { CanType } from "@/Types/CAN/can.types";
import { getAbilities } from "./canAbilities";

const defineAbility = () => {
  const { can, build } = new AbilityBuilder(Ability);
  // actions--> create,delete,update,read
  getAbilities()?.map((ability: CanType) => {
    return can(`${ability.can}`, `${ability?.resourse}`);
  });
  return build();
};

export const ability = defineAbility();

export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);

export const abilityFinder = (allowedAbility: string) => {
  return (
    getAbilities()?.find((abilities: CanType) => {
      return abilities?.resourse === allowedAbility;
    })?.can ?? ""
  );
};
