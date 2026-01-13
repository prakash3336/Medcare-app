import {useState} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ScrollView,Switch,Dimensions,Platform,Alert} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';

const frequencies = [
  {
    id: '1',
    label: 'Once daily',
    icon: 'sunny-outline' as const,
    times: ['09:00'],
  },
  {
    id: '2',
    label: 'Twice daily',
    icon: 'sync-outline' as const,
    times: ['09:00', '21:00'],
  },
  {
    id: '3',
    label: 'Three times daily',
    icon: 'repeat-outline' as const,
    times: ['09:00', '15:00', '21:00'],
  },
  {
    id: '4',
    label: 'Four times daily',
    icon: 'repeat-outline' as const,
    times: ['06:00', '12:00', '18:00', '00:00'],
  },
  {
    id: '5',
    label: 'As needed',
    icon: 'calendar-outline' as const,
    times: [],
  },
];

const durations=[ 
  {id: '1', label: '7 days', value: 7},
  {id: '2', label: '14 days', value: 14},
  {id: '3', label: '30 days', value: 30},
  {id: '4', label: '90 days', value: 90},
  {id: '5', label: 'Ongoing', value: -1},
];

export default function AddMedicationScreen() 
{
    const renderFrequencyOptions=() => {
        return ( 
            <View>
              {frequencies.map((freq) => (
                <TouchableOpacity key={freq.id}
               > 
                  <View>
                    <Ionicons name={freq.icon} size={24} />
                    <Text>{freq.label}</Text>
                  </View>


                </TouchableOpacity>
              ))}
            </View>
        )
    }

    const renderDurationOptions=() => {
        
      <View>
              {frequencies.map((freq) => (
                <TouchableOpacity key={freq.id}
               > 
                  <View>
                    <Ionicons name={freq.icon} size={24} />
                    <Text>{freq.label}</Text>
                  </View>


                </TouchableOpacity>
              ))}
            </View>
    }
      return (
                <View>
                    <LinearGradient 
                    colors={['#1a8e2d','#146922']} start={{x:0, y: 0}} end={{x: 1, y: 1}} />
                    <View>
                        <View>
                            <TouchableOpacity>
                                <Ionicons name='chevron-back' size={28} color={'#1a8e2d'} />
                            </TouchableOpacity>
                            <Text>New Medication</Text>
                        </View>

                         <ScrollView showsVerticalScrollIndicator={false}>
                              <View>
                                 <View>
                                    <TextInput placeholder='Medication Home'
                                    placeholderTextColor={'#999'} /> 
                                 </View>
                                 <View>
                                    <TextInput placeholder='Dosage (e.g., 500mg)'
                                    placeholderTextColor={'#999'} />
                                 </View>
                                 <View>
                                     <Text>
                                        How often? 
                                     </Text>
                                     {renderFrequencyOptions()}

                                     <Text>For how long?</Text>
                                 </View>
                              </View>
                         </ScrollView>
                    </View>
               </View>
      )
}