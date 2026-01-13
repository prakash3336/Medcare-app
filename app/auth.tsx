import {useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import {LinearGradient} from 'expo-linear-gradient';
import { successHaptic, errorHaptic } from '../utils/haptics';

const {width}=Dimensions.get('window');


export default function AuthScreen(){
    
    const [hasBiometrics,setHasBiometrics]=useState(false);
    const [isAuthenticating,setIsAuthenticating]=useState(false);
    const [error,setError]=useState<String | null>(null);
    const router=useRouter();
    useEffect(()=>{
        checkBiometrics();
    },[]);
    const checkBiometrics=async()=>{
        const hasHardware=await LocalAuthentication.hasHardwareAsync();
        const isEnrolled=await LocalAuthentication.isEnrolledAsync();
        setHasBiometrics(hasHardware && isEnrolled);
    
    };

   const authenticate = async () => {
  if (isAuthenticating) return;

  try {
    setIsAuthenticating(true);
    setError(null);

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: hasBiometrics
        ? 'Use Face ID/Touch ID'
        : 'Enter your PIN to access your medications',
      fallbackLabel: 'Use Pin',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });

    if (auth.success) {
      successHaptic();
      router.replace('/home');
    } else if (auth.error === 'user_cancel' || auth.error === 'system_cancel') {
      setIsAuthenticating(false);
    } else {
      errorHaptic();
      setError('Authentication failed. Please try again.');
      setIsAuthenticating(false);
    }
  } catch {
    errorHaptic();
    setError('Something went wrong. Please try again.');
    setIsAuthenticating(false);
  }
};


    return ( 
        <LinearGradient colors={['#1a237e', '#283593', '#3949ab']} style={styles.container}>
              <View style={styles.content}>
                  <View style={styles.iconContainer}>
                         <Ionicons name='medical' size={80} color='white'/>
                  </View>
                  <Text style
                ={styles.title}>
                      Medcare
                  </Text>
                  <Text style={styles.subtitle}>
                       Your Personal Medication Reminder
                  </Text>
                  <View style={styles.card}>
                       <Text style={styles.welcomeText}>
                           Welcome Back!
                       </Text>
                       <Text style={styles.instructionText}>
                           {hasBiometrics ? 'Use face ID/TouchID or PIN to access your medications' : 'Enter your PIN to access your medications'}
                       </Text>

                       <TouchableOpacity 
                            style={[styles.button,isAuthenticating && styles.buttonDisabled]}
                            onPress={authenticate}
                            disabled={isAuthenticating} 
                       >
                            <LinearGradient
                                colors={hasBiometrics ? ['#4CAF50', '#2E7D32'] : ['#2196F3', '#1976D2']}
                                style={styles.buttonGradient}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                            >
                                <Ionicons
                                    name={
                                        hasBiometrics ? 'finger-print-outline' : 'keypad-outline'
                                    }
                                    size={28}
                                    color='white'
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.buttonText}>
                                     {isAuthenticating ? 'Verifying...' : hasBiometrics ? 'Authenticate' : 'Enter PIN'}
                                </Text>
                            </LinearGradient>
                       </TouchableOpacity>

                       {error && <View style={styles.errorContainer}>
                            <Ionicons name='alert-circle' size={22} color='#d32f2f'/>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>}
                  </View>
                  
                  <View style={styles.footer}>
                      <Text style={styles.footerText}>
                          Secure • Private • Reliable
                      </Text>
                  </View>
              </View>
        </LinearGradient>
    )
}


const styles=StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 140,
        height: 140,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: 'white',
        marginBottom: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.95)',
        marginBottom: 50,
        textAlign: 'center',
        fontStyle: 'italic',
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 35,
        width: width-40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 12,
        color: '#1a237e',
        textAlign: 'center',
    },
    instructionText: {
        fontSize: 15,
        color: '#666',
        marginBottom: 35,
        textAlign: 'center',
        lineHeight: 22,
    },
    button: {
        borderRadius: 16,
        width: '100%',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
    },
    buttonGradient: {
        paddingVertical: 18,
        paddingHorizontal: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 16,
    },
    buttonDisabled: {
        opacity: 0.8,
    },
    buttonIcon: {
        marginRight: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        padding: 15,
        backgroundColor: '#ffebee',
        borderRadius: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ffcdd2',
    },
    errorText: {
        color: '#d32f2f',
        fontSize: 15,
        marginLeft: 10,
        fontWeight: '500',
        flex: 1,
    },
    footer: {
        marginTop: 40,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 1,
    },
});