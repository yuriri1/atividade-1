import * as React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
 
export default class homePage extends React.Component {
  static navigationOptions = {
    title: 'Eventos',
  };
 
  constructor(props){
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount(){
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', async () => {
      return await fetch('https://mocki.io/v1/399dc002-e49d-4e92-af6f-37f59825bd47')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoading: false,
          events: json
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
    });
  }
 
  componentWillUnmount() {
    this.focusListener.remove();
  } 
 
  render() {
    // if(this.state.isLoading){
    //   return(
    //     <View style={{flex: 1, padding: 20}}>
    //       <ActivityIndicator/>
    //     </View>
    //   )
    // }
 
    const {navigate} = this.props.navigation;
    return(
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.events}
          renderItem={({item}) => 
            <TouchableOpacity onPress={() => navigate('Event', {event: item})}>
              <View style={styles.card}>
                <Text style={styles.event} key={item.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          }
        /> 
      </SafeAreaView>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor:'#0d1b2a'
  },
  event: {
    fontSize: 18,
    color: '#e0e1dd',
    fontFamily: 'monospace'
  },
  card: {
    backgroundColor: '#415a77',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 5,
  },
})