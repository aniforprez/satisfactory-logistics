import { Box, Group, Image, Stack, Text } from '@mantine/core';
import { NodeProps } from '@xyflow/react';
import { memo } from 'react';
import { RepeatingNumber } from '../../../core/intl/NumberFormatter';
import { FactoryItem } from '../../FactoryItem';
import { InvisibleHandles } from './InvisibleHandles';

export interface IByproductNodeData {
  resource: FactoryItem;
  value: number;
  [key: string]: unknown;
}

export type IByproductNodeProps = NodeProps & {
  data: IByproductNodeData;
  type: 'Byproduct';
};

export const ByproductNode = memo((props: IByproductNodeProps) => {
  const { resource, value } = props.data;
  return (
    <Box p="sm" style={{ borderRadius: 4 }} bg="teal.9">
      <Group gap="xs">
        <Image w="32" h="32" src={resource.imagePath} />
        <Stack gap={2} align="center">
          <Group gap="xs">
            <Text size="sm">{resource.displayName}</Text>
          </Group>
          <Text size="xs">
            <RepeatingNumber value={value} />
            /min
          </Text>
        </Stack>
      </Group>

      <InvisibleHandles />
      {/* <Handle type="source" position={Position.Right} id="source-right" />
      <Handle type="target" position={Position.Left} id="target-left" /> */}
    </Box>
  );
});