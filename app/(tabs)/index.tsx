import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useCalculatorStore } from '@/store/calculator-store';
import CalculatorCard from '@/components/CalculatorCard';
import EmptyState from '@/components/EmptyState';
import AdBanner from '@/components/AdBanner';
import PrebuiltCalculatorsModal from '@/components/PrebuiltCalculatorsModal';
import Colors from '@/constants/colors';

export default function HomeScreen() {
  const router = useRouter();
  const calculators = useCalculatorStore((state) => state.calculators);
  const [prebuiltModalVisible, setPrebuiltModalVisible] = useState(false);

  const navigateToCalculator = (id: string) => {
    router.push(`/calculator/${id}`);
  };

  const navigateToCreate = () => {
    router.push('/create');
  };

  const openPrebuiltModal = () => {
    setPrebuiltModalVisible(true);
  };

  const closePrebuiltModal = () => {
    setPrebuiltModalVisible(false);
  };

  if (calculators.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="No Calculators Yet"
          description="Create your first custom calculator or choose from our pre-built collection."
          buttonTitle="Create Calculator"
          onButtonPress={navigateToCreate}
          secondaryButtonTitle="Pre-built Calculators"
          onSecondaryButtonPress={openPrebuiltModal}
        />
        <PrebuiltCalculatorsModal 
          visible={prebuiltModalVisible} 
          onClose={closePrebuiltModal} 
        />
        <AdBanner />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={calculators}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CalculatorCard
            id={item.id}
            name={item.name}
            description={item.description}
            inputCount={item.inputs.length}
            onPress={() => navigateToCalculator(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <PrebuiltCalculatorsModal 
              visible={prebuiltModalVisible} 
              onClose={closePrebuiltModal} 
            />
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <EmptyState
                  title=""
                  description=""
                  buttonTitle="Pre-built Calculators"
                  onButtonPress={openPrebuiltModal}
                />
              </View>
            </View>
          </View>
        }
      />
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  footerContainer: {
    marginTop: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: 300,
  },
});