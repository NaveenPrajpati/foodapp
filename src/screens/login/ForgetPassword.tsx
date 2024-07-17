import {View, Text, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import InputTag from '../../components/elements/InputTag';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {showToast} from '../../utils/utilityFunctions';
import {OTPSchema} from './validation';

interface FormValueTypes {
  otp: string;
}

const OTPInput: React.FC = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOTPVerify = (values: FormValueTypes) => {
    Keyboard.dismiss();
    // dispatch(verifyOTP(values.otp));
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <Formik
        initialValues={{otp: ''}}
        validationSchema={OTPSchema}
        onSubmit={handleOTPVerify}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View
            style={{
              borderRadius: 15,
              padding: 20,
              flex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}>
                OTP Verification
              </Text>
              <Text style={{color: 'black'}}>
                Please enter the OTP sent to your phone
              </Text>
            </View>

            <InputTag
              inputMode="numeric"
              placeholder="Enter OTP"
              onChangeText={handleChange('otp')}
              onBlur={handleBlur('otp')}
              value={values.otp}
            />
            {touched.otp && errors.otp && (
              <Text style={{color: 'red'}}>{errors.otp}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit as any}
              style={{
                backgroundColor: 'black',
                marginTop: 20,
                padding: 10,
                borderRadius: 30,
                width: '60%',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Verify OTP
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                showToast(
                  'info',
                  'OTP Resent',
                  'A new OTP has been sent to your phone',
                );
                // Add logic to resend OTP here
              }}
              style={{marginTop: 20, padding: 10, borderRadius: 30}}>
              <Text
                style={{color: '#1E90FF', fontSize: 16, textAlign: 'center'}}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default OTPInput;
