import type { Meta, StoryObj } from "@storybook/html";
import type {
  IInputs,
  IOutputs,
} from "../DiplomaComponentControl/generated/ManifestTypes";
import { useArgs, useEffect } from "@storybook/preview-api";
import {
  ComponentFrameworkMockGenerator,
  StringPropertyMock,
} from "@shko.online/componentframework-mock";
import { DiplomaComponentControl as Component } from "../DiplomaComponentControl/index";
import "../DiplomaComponentControl/DiplomaComponentControl.css";

interface StoryArgs {
  creditCardNumber: string;
}

export default {
  title: "",
  argTypes: {
    creditCardNumber: {
      control: "text",
      name: "CreditCardNumber",
      table: {
        category: "Parameters",
      },
    },
  },
  args: {
    creditCardNumber: "",
  },
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.width = "750px";
      container.style.border = "dotted 1px";

      var storyResult = Story();
      if (typeof storyResult == "string") {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }
      return container;
    },
  ],
} as Meta<StoryArgs>;

const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;
  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );
    if (!container) {
      container = document.createElement("div");
      mockGenerator = new ComponentFrameworkMockGenerator(Component,{CreditCardNumber: StringPropertyMock,},container);
      mockGenerator.context._SetCanvasItems({
        CreditCardNumber: args.creditCardNumber,
      });

      mockGenerator.onOutputChanged.callsFake(() => {
        mockGenerator.context._parameters.CreditCardNumber._Refresh();
        updateArgs({
          creditCardNumber:
            mockGenerator.context._parameters.CreditCardNumber.raw || undefined,
        });
      });
      mockGenerator.ExecuteInit();
    }
    if (mockGenerator) {
      mockGenerator.context._parameters.CreditCardNumber._SetValue(args.creditCardNumber);
      mockGenerator.ExecuteUpdateView();
    }
    return container;
  };
};

export const DiplomaComponentControl = {
  render: renderGenerator(),
  parameters: { controls: { expanded: true } },
} as StoryObj<StoryArgs>;


