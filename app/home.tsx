import { LinearGradient } from 'expo-linear-gradient';
import {useState,useEffect,useRef,useCallback} from 'react';
import {View,Text,StyleSheet,Animated, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Svg, {Circle} from 'react-native-svg';
import {Link,useRouter} from 'expo-router';
import { Modal } from 'react-native';

const {width}=Dimensions.get('window');
const AnimatedCircle=Animated.createAnimatedComponent(Circle);
const quick_actions = [
  {
    icon: 'add-circle-outline' as const,
    label: 'Add \nMedication',
    route: '/medications/add' as const,
    color: '#FFFFFF', // clean white icon
    gradient: ['#43A047', '#1B5E20'] as [string, string], // medical green
  },
  {
    icon: 'calendar-outline' as const,
    label: 'Calender\nView',
    route: '/calendar' as const,
    color: '#FFFFFF',
    gradient: ['#1E88E5', '#0D47A1'] as [string, string], // schedule blue
  },
  {
    icon: 'time-outline' as const,
    label: 'History\nLog',
    route: '/history' as const,
    color: '#FFFFFF',
    gradient: ['#FB8C00', '#E65100'] as [string, string], // activity orange
  },
  {
    icon: 'medical-outline' as const,
    label: 'Refill\nReminder',
    route: '/refills' as const,
    color: '#FFFFFF',
    gradient: ['#8E24AA', '#4A148C'] as [string, string], // alert purple
  },
];


interface CicularProgressProps{
    progress: number,
    totalDoses: number,
    completedDoses: number,
}

function CircularProgress({
    progress,totalDoses,completedDoses,
}:CicularProgressProps){
    const animationValue=useRef(new Animated.Value(0)).current;
    const size=width*0.55 
    const strokeWidth=15
    const radius=(size-strokeWidth)/2
    const circumference=2*Math.PI*radius;

  useEffect(() => {
  Animated.timing(animationValue, {
    toValue: progress /100,
    duration: 1000,
    useNativeDriver: false,
  }).start();
}, [progress]);


    const strokeDashoffset=animationValue.interpolate({
        inputRange: [0,1],
        outputRange: [circumference,0],
    });

    return ( 
        <View style={styles.progressContainer}>
            <View style={styles.progressTextContainer}>
                <Text style={styles.progressPercentage}> {Math.round(progress)}%</Text>
                <Text style={styles.progressLabel}>{" "} {completedDoses} of {totalDoses} Doses Taken</Text>
            </View> 
                    <Svg width={size} height={size} style={styles.progressRing}>
            <Circle
                cx={size/2}
                cy={size/2}
                r={radius}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={strokeWidth}
                fill="none"
            />

                <AnimatedCircle
  cx={size / 2}
  cy={size / 2}
  r={radius}
  stroke="white"
  strokeWidth={strokeWidth}
  fill="none"
  strokeDasharray={`${circumference} ${circumference}`}
  strokeDashoffset={strokeDashoffset}
  strokeLinecap="round"
  transform={`rotate(-90 ${size/2} ${size/2})`}
/>

            </Svg>
        </View>
    )

}   

export default function HomeScreen(){
    const router=useRouter();
    return ( 
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
            <LinearGradient colors={['#1a237e', '#1a237e']} style={styles.header}>
                 <View style={styles.headerContent}>
                    <View style={styles.headerTop}>
                        <View style={{flex:1}}>
                             <Text style={styles.greeting}>Daily Progress</Text>
                        </View>
                        <TouchableOpacity style={styles.notificationbutton}>
                            <Ionicons name='notifications-outline' size={24} color='white'/>
                            <View style={styles.badge}>
                                <Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <CircularProgress 
                        progress={10}
                        totalDoses={10}
                        completedDoses={1}
                    />
                 </View>
            </LinearGradient>

            <View style={styles.content}>
                <View style={styles.quickActionsContainer}>
                    <Text style={styles.sectionTitle}> Quick Actions</Text>
                    <View style={styles.quickActionGrid}>
                         {quick_actions.map((action)=>(
                            <Link href={action.route} key={action.label} asChild>
                                <TouchableOpacity style={styles.actionButton}>
                                    <LinearGradient colors={action.gradient} style={styles.actionGradient} start={{x:0,y:0}} end={{x:1,y:1}}>
                                          <View style={styles.actionContent}>
                                            <View style={styles.actionIcon}>
                                               <Ionicons name={action.icon} size={32} color='white'/>
                                            </View>
                                               <Text style={styles.actionLabel}>
                                                {action.label}
                                                </Text>
                                          </View>
                                    </LinearGradient>
 
                                </TouchableOpacity>
                            </Link>
                         ))}
                    </View>
                </View>
           </View>

           <View style={{paddingHorizontal: 20}}>
               <View style={styles.sectionHeader}>
                   <Text style={styles.sectionTitle}>Today's Schedule</Text>
                   <Link href='/calender' asChild>
                     <TouchableOpacity>
                        <Text style={styles.seeAllButton}>
                            See All
                        </Text>
                     </TouchableOpacity>
                   </Link>
               </View>
               {true ? ( 
                  <View style={styles.emptyState}>
                    <Ionicons name='medical-outline' size={64} color='#1a237e'/>
                    <Text style={styles.emptyStateText}>No medications Scheduled for today.</Text>
                    <Link href='/medications/add' asChild>
                     <TouchableOpacity style={styles.addMedicationButton}>
                       <Text style={styles.addMedicationButtonText}>Add Medication</Text>
                     </TouchableOpacity>
                    </Link>
                  </View>
               ) : (
                 [].map((medications) => {
                    return ( 
                        <View style={styles.doseCard}>
                           <View style={[styles.doseBadge,{backgroundColor: '#1a237e'}]}>
                              <Ionicons name='medical-outline' size={32} color='#1a237e'/>
                                </View>
                                <View style={styles.doseInfo}>
                                     <View>
                                          <Text style={styles.medicineName}>name</Text>
                                          <Text style={styles.dosageInfo}>dosage</Text>
                                     </View>
                                     <View style={styles.doseTime}>
                                        <Ionicons name='time-outline' size={16} color='#ccc' />
                                        <Text>time</Text>
                                    </View>
                                </View>
                                {true ? ( 
                                    <View style={styles.takeDoseButton}>
                                        <Ionicons name='checkmark-circle-outline' size={24} />
                                        <Text>Taken</Text>
                                        </View>
                                ) : (
                                    <TouchableOpacity style={styles.takeDoseButton}>
                                        <Ionicons name='close-circle-outline' size={24} />
                                        <Text style={styles.takeDoseText}>Missed</Text>
                                    </TouchableOpacity>
                                )
                                }

                        </View>
                    )
                 })

               )}
           </View>

           <Modal visible={false} transparent={true} animationType='slide'>
             <View style={styles.modelOverlay}>
                  <View style={styles.modelContent}>
                       <Text style={styles.modelTitle}>
                            Notification
                       </Text>
                       <TouchableOpacity style={styles.closeButton}>
                            <Ionicons name='close' size={24} color='#ccc'/>
                       </TouchableOpacity>
                  </View>
                  {[].map((medication)=>(
                          
                        <View style={styles.notificationItem}> 
                            <View style={styles.notificationIcon}>
                                <Ionicons name='medical' size={48} color='#1a237e'/>
                            </View>
                        <View style={styles.notificationContent}>
                              <Text style={styles.notificationTitle}>medication name</Text>
                              <Text style={styles.notificationMessage}>medication dosage</Text>
                              <Text style={styles.notificationTime}>medication time</Text>
                        </View>
                        </View>
                          
                  ))}
             </View>

           </Modal>
        </ScrollView>
                
    );
}


const styles=StyleSheet.create({

     container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
     },
        header: {
            paddingTop: 50,
            paddingBottom: 25,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
        },
        headerContent: {
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        headerTop: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginBottom: 20,
        },
        greeting: {
            fontSize: 24,
            color: 'white',
            fontWeight: 'bold', 
            opacity: 0.9,
        },
        content: {
            flex: 1,
            paddingTop: 20,
        },
        notificationbutton: {
            position: 'relative',
            padding: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 12,
            marginLeft: 10,
        },
        badge: {
            position: 'absolute',
            top: -4,
            right: -4,
            backgroundColor: '#ff5252',
            borderRadius: 10,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 4,
            borderWidth: 2,
            borderColor: '#146922',
            minWidth: 20,
        },
        notificationCount: {
            fontSize: 11,
            fontWeight: 'bold',
            color: 'white',
        },
        progressContainer: {
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
        },
        progressTextContainer: {
            position: 'absolute',
            width: width * 0.55,
            height: width * 0.55,
            alignItems: 'center',
            justifyContent: 'center',
        },

        progressPercentage: {
            fontSize: 36,
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 'bold',
        },
        progressLabel: {
            fontSize: 14,
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 'bold',
        },
        progressDetails: {
            fontSize: 11,
            color: 'white',
            fontWeight: 'bold'
        },
        progressRing: {
            transform: [{ rotate: '-90deg' }],
        },
        quickActionsContainer: {
               paddingHorizontal: 20,
               marginBottom: 30  
        },
        quickActionGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            marginTop: 15,
        },
        actionButton: {
            width : (width-52) / 2,
            height: 110,
            borderRadius: 16,
            overflow: 'hidden',
        },
        actionGradient: {
            flex: 1,
            padding: 15,
        },
        actionIcon: {
            width: 40,
            height: 40,
            borderRadius: 13,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            alignItems: 'center',
            justifyContent: 'center',
        },
        actionLabel: {
            fontSize: 14,
            color: 'white',
            fontWeight: '600',
            marginTop: 8,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 15,
            color: '#1a1a1a'
        },
        actionContent: {
            flex: 1,
            justifyContent: 'space-between',

        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
        },
        seeAllButton: {
           color: "#2E7D32",
           fontWeight: "600",
        },
        emptyState: {
            alignItems: 'center',
            padding: 30,
            backgroundColor: 'white',
            borderRadius: 16,
            marginTop: 10,
        },
        emptyStateText: {
            fontSize: 15,
            color: '#666',
            marginTop: 15,
            marginBottom: 20,
        },
        addMedicationButton: {
            backgroundColor: '#1aBe2d',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 20,
        },
        addMedicationButtonText: {
            color: 'white',
            fontWeight: '600', 
        },
        doseCard: {
            flexDirection: 'row',   
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 15,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
        },
        doseBadge: {
             width: 50,
             height: 50,
             borderRadius: 12,
             justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,      
        },
        doseInfo: {
            flex: 1,
            justifyContent: "space-between",
        },
        medicineName: {
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
            marginBottom: 4,    
        },
        dosageInfo: {
            fontSize: 14,
            color: '#666',
            marginBottom: 6,
        },
        doseTime: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        timeText: {
            marginLeft: 6,
            color: '#666',
            fontSize: 14,
        },
        takeDoseButton: {
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 15,
            marginLeft: 10,
        },
        takeDoseText: {
            color: 'white',
            fontWeight: '600',
            fontSize: 14,
        },
        modelOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
        },
        modelContent: {
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: '80%',
        },
        modelHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        modelTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',
        },
        notificationItem: {
            borderRadius: 12,
            backgroundColor: '#f5f5f5',
            marginBottom: 15,
        },
        notificationIcon: {
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: '#E8F5E9',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
        },
        notificationContent: {
            flex: 1,
        },
        notificationTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
        },
        notificationMessage: {
            fontSize: 14, 
            color: '#666',
            marginBottom: 4,
        },
        notificationTime: {
            fontSize: 12,
            color: '#999',
        },
        closeButton: {
            padding: 8,
        },






        




});