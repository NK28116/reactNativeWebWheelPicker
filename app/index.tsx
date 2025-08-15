import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, JSX } from 'react';
import CustomWheelPicker from '@/app/components/CutomWheelPicker'; // Adjust the import path as necessary

const Index = (): JSX.Element => {
const [birthDate, setBirthDate] = useState('2025-12-22'); // ← ISO形式に統一
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={styles.label}>
          生年月日 <Text style={styles.required}>※必須</Text>
        </Text>

        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.pickerBox}>
          <Text style={styles.pickerText}>{birthDate || '日付を選択'}</Text>
        </TouchableOpacity>

        {showPicker && (
          <CustomWheelPicker
            dataset={generateDateList()}
            initialValue={birthDate}
            onConfirm={(value) => {
                setBirthDate(value);
                setShowPicker(false);
                console.log(value);
              }}
              onCancel={() => setShowPicker(false)}
            />
          )}

          <Text style={styles.note}>※生年月日は変更できません</Text>
        </View>
      </View>
    );
  };

  const generateDateList = (): string[] => {
    const dates: string[] = [];
    const start = new Date(1950, 0, 1);
    const end = new Date(2025, 11, 31);
    let current = new Date(start);

    while (current <= end) {
      dates.push(current.toISOString().slice(0, 10)); // "YYYY-MM-DD"
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const styles = StyleSheet.create({
    pickerContainer: {
      width: '100%',
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 4,
    },
    required: {
      color: 'red',
      fontWeight: 'bold',
    },
    pickerBox: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      borderRadius: 8,
      backgroundColor: '#eee',
      width: 200,
    },
    pickerText: {
      fontSize: 16,
      textAlign: 'center',
    },
    note: {
      marginTop: 8,
      color: '#666',
      fontSize: 12,
    },
  });

  export default Index;
  