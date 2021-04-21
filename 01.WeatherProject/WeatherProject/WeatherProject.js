import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
} from 'react-native';
import Forecast from './Forecast';
import Weather from './api/Weather';

class WeatherProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zip: '',
      forecast: null,
    };
  }

  render() {
    const { forecast } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />

        <ImageBackground
          source={require('./flowers.png')}
          resizeMode={'cover'}
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>Current weather for</Text>

              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  underlineColorAndroid={'transparent'}
                  onSubmitEditing={this._changeTextHandler}
                />
              </View>
            </View>

            {forecast && (
              <Forecast
                main={forecast.main}
                description={forecast.description}
                temp={forecast.temp}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }

  _changeTextHandler = e => {
    let zip = e.nativeEvent.text;

    Weather.fetchForecast(zip).then(forecast => {
      this.setState({
        forecast,
      });
    });
  };
}

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backdrop: {
    flex: 1,
    flexDirection: 'column',
  },

  overlay: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#000',
    opacity: 0.5,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30,
  },

  zipContainer: {
    height: baseFontSize + 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
  },

  zipCode: {
    flex: 1,
    flexBasis: 1,
    width: 50,
    height: baseFontSize,
    marginBottom: 10,
  },

  mainText: {
    fontSize: baseFontSize,
    color: '#fff',
  },
});

export default WeatherProject;
