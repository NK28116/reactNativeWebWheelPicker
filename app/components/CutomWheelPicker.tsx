import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Button} from "react-native-elements";

type Props = {
  dataset: string[];
  initialValue?: string;
  onConfirm: (value: string) => void;
  onCancel?: () => void;
};

const ITEM_HEIGHT = 48;

const CustomWheelPicker = ({
  dataset,
  initialValue,
  onConfirm,
  onCancel,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const index = dataset.findIndex((d) => d === initialValue);
    if (index >= 0) {
      setSelectedIndex(index);
      scrollRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
    }
  }, [initialValue]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    setSelectedIndex(index);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    setSelectedIndex(index);
  };

  const confirmValue = () => {
    onConfirm(dataset[selectedIndex]);
  };

  return (
    <Modal transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.pickerContainer}>
          {/* ヘッダー */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.cancelText}>キャンセル</Text>
            </TouchableOpacity>

            <Button onPress={confirmValue} >
            </Button>
          </View>

          {/* ホイール本体 */}
          <View style={styles.wheelWrapper}>
            <ScrollView
              ref={scrollRef}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
                onScroll={handleScroll} // 👈 追加
                scrollEventThrottle={16} // 👈 忘れずに
              onMomentumScrollEnd={handleScrollEnd}
              contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
            >
              {dataset.map((item, index) => (
                <View key={index} style={styles.item}>
                  <Text
                    style={[
                      styles.itemText,
                      index === selectedIndex && styles.itemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.highlight} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#999',
  },
  doneText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  wheelWrapper: {
    height: ITEM_HEIGHT * 5,
    width: width,
    position: 'relative',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    color: '#666',
  },
  itemTextSelected: {
    fontWeight: 'bold',
    color: '#000',
  },
  highlight: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    height: ITEM_HEIGHT,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default CustomWheelPicker;
