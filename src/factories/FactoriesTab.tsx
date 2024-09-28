import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { IconBuildingFactory, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../core/store';
import { FactoryRow } from './FactoryRow';
import { FactoriesFiltersSection } from './filters/FactoriesFiltersSection';
import { ImportFactoriesModal } from './import/ImportFactoriesModal';
import { factoryActions, useFactories } from './store/FactoriesSlice';
import { FactoryUndoButtons } from './store/FactoryUndoButtons';
import { FactoryWideCard } from './wide/FactoryWideCard';

export interface IFactoriesTabProps {}

export function FactoriesTab(_props: IFactoriesTabProps) {
  const dispatch = useDispatch();
  const factories = useFactories();
  const viewMode = useSelector(
    (state: RootState) => state.factories.present.filters?.viewMode ?? 'wide',
  );

  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeaderTop(header.offsetHeight);
    });
    resizeObserver.observe(header);
    return () => resizeObserver.disconnect();
  }, []);

  const hasFactories = useSelector(
    (state: RootState) => state.factories.present.factories.length > 0,
  );

  return (
    <div>
      {hasFactories && (
        <Box
          bg="dark.7"
          w="100%"
          style={{
            position: 'sticky',
            top: headerTop,
            zIndex: 10,
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Container size="lg" pt="md" pb="md">
            <FactoriesFiltersSection />
          </Container>
        </Box>
      )}

      <Container size="lg" mt="lg">
        {factories.length === 0 && (
          <Stack gap="xs" align="center" mih={200} mt={60} mb={90}>
            <IconBuildingFactory size={64} stroke={1.2} />
            <Text fz="h2">Let's build some factories!</Text>
            <Text size="sm" c="dark.2">
              Add factories to start planning your logistics.
            </Text>
            <Button
              leftSection={<IconPlus size={16} />}
              mt="lg"
              size="lg"
              onClick={() => dispatch(factoryActions.add({}))}
            >
              Add first factory
            </Button>
          </Stack>
        )}
        <Stack gap="md">
          {viewMode === 'wide' &&
            factories.map((factory, index) => (
              <FactoryWideCard
                key={factory.id}
                factory={factory}
                index={index}
              />
            ))}
          {viewMode === 'compact' &&
            factories.map((factory, index) => (
              <FactoryRow key={factory.id} factory={factory} index={index} />
            ))}
        </Stack>
        <Divider mb="lg" />
        {/* <FactoryItemInput /> */}
        <Group mt="lg">
          <Button
            leftSection={<IconTrash size={16} />}
            color="red"
            variant="light"
            onClick={() => dispatch(factoryActions.clear())}
          >
            Clear All
          </Button>
          <ImportFactoriesModal />
          <FactoryUndoButtons />
        </Group>
      </Container>
    </div>
  );
}
