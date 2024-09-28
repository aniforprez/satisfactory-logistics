import { ActionIcon, Group, Image, NumberInput } from '@mantine/core';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { FactoryChangeHandler } from './FactoryRow';
import { FactoryUsage } from './FactoryUsage';
import { FactoryItemInput } from './inputs/FactoryItemInput';
import {
  factoryActions,
  GameFactory,
  GameFactoryOutput,
} from './store/FactoriesSlice';
import { useIsFactoryVisible } from './useIsFactoryVisible';

export interface IFactoryOutputRowProps {
  factory: GameFactory;
  output: GameFactoryOutput;
  index: number;
  onChangeFactory: FactoryChangeHandler;
}

export function FactoryOutputRow(props: IFactoryOutputRowProps) {
  const { factory, output, index, onChangeFactory } = props;
  const dispatch = useDispatch();

  const isVisible = useIsFactoryVisible(factory.id, false, output.resource);
  if (!isVisible) return null;

  return (
    <Group key={index} gap="sm">
      <FactoryItemInput
        size="sm"
        variant="default"
        width={320}
        value={output.resource}
        onChange={onChangeFactory(factory.id, `outputs[${index}].resource`)}
      />

      <NumberInput
        value={output.amount ?? 0}
        w={100}
        fw={!output.somersloops ? 'normal' : 'bold'}
        styles={{
          input: {
            color: !output.somersloops ? '' : 'var(--mantine-color-grape-5)',
            borderColor: !output.somersloops
              ? ''
              : 'var(--mantine-color-grape-5)',
          },
        }}
        onChange={value => {
          dispatch(
            factoryActions.updateOutputAmount({
              id: factory.id,
              index: index,
              value: Number(value),
            }),
          );
        }}
      />
      <NumberInput
        value={output.somersloops ?? 0}
        w={60}
        variant="filled"
        fw={!output.somersloops ? 'normal' : 'bold'}
        styles={{
          input: {
            color: !output.somersloops ? '' : 'white',
            backgroundColor: !output.somersloops
              ? ''
              : 'var(--mantine-color-grape-5)',
          },
        }}
        onChange={value => {
          dispatch(
            factoryActions.updateSomersloops({
              id: factory.id,
              outputIndex: index,
              value: Number(value),
            }),
          );
        }}
        rightSection={
          <Image
            src="/public/images/somersloop_256.png"
            alt="Somerloops"
            width={20}
            height={20}
          />
        }
      />
      <ActionIcon
        variant="outline"
        color="red"
        disabled={factory.outputs?.length === 1}
        size="md"
        onClick={() =>
          dispatch(
            factoryActions.update({
              id: factory.id,
              outputs: factory.outputs?.filter((_, i) => i !== index),
            }),
          )
        }
      >
        <IconTrash size={16} stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        variant="outline"
        color="blue.4"
        size="md"
        onClick={() =>
          dispatch(
            factoryActions.highlightOutput({
              id: factory.id,
              index: index,
            }),
          )
        }
      >
        <IconEye size={16} stroke={1.5} />
      </ActionIcon>
      <FactoryUsage factoryId={factory.id} output={output.resource} />
    </Group>
  );
}
