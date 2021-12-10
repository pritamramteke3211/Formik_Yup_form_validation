import {
  Input,
  Stack,
  FormControl,
  Form,
  Item,
  Label,
  CheckBox,
  Button,
  Body,
  ListItem,
} from 'native-base';
import React ,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import * as yup from 'yup';
import {Formik} from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const loginValidationSchema = yup.object().shape({
  // email: yup
  //   .string()
  //   .email('Please enter valid email')
  //   .required('Email Address is required'),
  username: yup
    .string()
    .min(3, ({min}) => `Username must be at least ${min} characters long`)
    .required('Username is required'),

  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
});

const LoginScreen = () => {
  const [remeberMe, setRemeberMe] = useState(false)
  const navigation = useNavigation();
  return (
    // Container Start
    <Formik
      initialValues={{ username: '', password: ''}}
      validateOnMount={true}
      onSubmit={values =>{
          //Call Login Service Here Where We can Pass This values
          navigation.navigate('Home')

      }
        }
      validationSchema={loginValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <ScrollView
          style={{flex: 1, backgroundColor: '#fffff'}}
          showsVerticalScrollIndicator={false}>
          {/* Brand View */}
          <View style={styles.mainView}>
            <View style={styles.brandView}>
              <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>
                Logistics Cube
              </Text>
            </View>
          </View>

          {/* Bottom View */}
          <View style={styles.bottomView}>
            {/* Welcome View */}
            <View style={{padding: 40}}>
              <Text style={{color: '#4632A1', fontSize: 34}}>Welcome</Text>
              <Text>
                Don't have an account?
                <Text style={{color: 'red', fontStyle: 'italic'}}>
                  {' '}
                  Register Now
                </Text>
              </Text>
              {/* Form Inputs View */}
              <View style={{marginTop: 50}}>
                <Form>
                  {/* <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType="email-address"
                    />
                  </Item>
                  {errors.email && touched.email && (
                    <Text style={styles.errors}>{errors.email}</Text>
                  )} */}
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />
                  </Item>
                  {errors.username && touched.username && (
                    <Text style={styles.errors}>{errors.username}</Text>
                  )}
                  <Item floatingLabel>
                    <Label>Password </Label>
                    <Input
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                    />
                  
                    
                  </Item>
                  
                  {errors.password && touched.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}
                </Form>
              </View>

              {/* Forget password & Remember Me View */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{flex: 1, marginLeft: 20, justifyContent: 'center'}}>
                  <ListItem>
                    <CheckBox onPress={()=> setRemeberMe(!remeberMe)} checked={remeberMe} color="#4632A1" />
                    <Body>
                      <Text style={{color: '#8f9195', alignSelf: 'flex-start'}}>
                        {' '}
                        Remeber Me
                      </Text>
                    </Body>
                  </ListItem>
                </View>

                <View
                  style={{flex: 1, marginLeft: 20, justifyContent: 'center'}}>
                  <ListItem>
                    <Body>
                      <Text style={{color: '#8f9195', alignSelf: 'flex-end'}}>
                        Forget Password
                      </Text>
                    </Body>
                  </ListItem>
                </View>
              </View>

              {/* Login Button & Social Login Button View */}
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={{
                    backgroundColor: isValid ? '#4632A1' : '#CACFD2',
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{fontSize: 24, color: 'white'}} >Login</Text>
                </TouchableOpacity>

                <View style={{marginTop: 20}}>
                  <Text>Or Login With</Text>
                </View>

                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <Pressable style={{paddingHorizontal: 20}}>
                    <Text>Facebook</Text>
                  </Pressable>
                  <Pressable style={{paddingHorizontal: 20}}>
                    <Text>Twitter</Text>
                  </Pressable>
                  <Pressable style={{paddingHorizontal: 20}}>
                    <Text>Google</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
    //Container  End
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainView: {
    height: Dimensions.get('window').height / 2.5,
    backgroundColor: 'skyblue',
  },
  brandView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandViewText: {
    color: '#fffff',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  forgotPasswordView: {
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
  },
  errors: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
