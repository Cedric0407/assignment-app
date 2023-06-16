import { Meta, StoryObj } from '@storybook/angular';

import { ModalConfirmationDeleteComponent } from './modal-confirmation-delete.component';

type ComponentWithCustomControls = ModalConfirmationDeleteComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Modal Confirmation Delete',
  component: ModalConfirmationDeleteComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `ModalConfirmationDelete` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const ModalConfirmationDelete: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
