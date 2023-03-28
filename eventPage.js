import * as React from 'react';
import { Text, View, ScrollView, StyleSheet,Image, Linking, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';

export default class eventPage extends React.Component {
    static navigationOptions = {
      title: 'Dados do Evento',
    };
   
    constructor(props) {
      super(props);
      let event = props.navigation.getParam('event');
      this.state = {
        title: event.title,
        place: event.place,
        datetime: event.datetime,
        image: event.image,
        video: event.video,
        cost: event.cost,
        sales: event.sales,
        socialmedia: {
            facebook: event.socialmedia.facebook,
            twitter: event.socialmedia.twitter,
            instagram: event.socialmedia.instagram,
            whattsapp: event.socialmedia.whattsapp,
            email: event.socialmedia.email            
        },
        geo: {
            lat: event.geo.lat,
            lng: event.geo.lng
        }
      };
    }

    render() {
        const { navigate } = this.props.navigation
        const {title, place, datetime, image, video, cost, sales, socialmedia, geo} = this.state
        const date = datetime.split(" ")[0] // dd/mm/yyyy
        const time = datetime.split(" ")[1] // hh:mm
        const costInitial = cost.split(" - ")[0]
        const costFinal = cost.split(" - ")[1]
        const zap = socialmedia.whattsapp.replace("+","").replace(" ", "").replace(" ", "").replace("-", "").replace("-", "")
        return (
          <ScrollView>
            <View style={styles.container}>
              <Image style={styles.image} source={{uri:image}}/>
              
              <View style={styles.cardTitle}>
                <Text style={styles.title}>{title}</Text>
              </View>

              <View style={styles.cardDetails}>
                <Text style={styles.details}>{place}</Text>
                <Text style={styles.details}>{date} as {time}</Text>
              </View>

              <View style={styles.cardLocation}>
                <View style={{alignItems:'center'}}>
                  <TouchableOpacity onPress={() => { Linking.openURL(`geo:0,0?q=${geo.lat},${geo.lng}`) }}>
                    <Icon name="map" size={50} color="#e0e1dd" />
                  </TouchableOpacity>
                  <Text style={styles.linkable}>Abrir no mapa</Text>
                </View>

                <View style={{alignItems:'center'}}>
                  <TouchableOpacity onPress={() => { Linking.openURL(video) }}>
                    <Icon name="youtube-play" size={50} color="#e0e1dd" />
                  </TouchableOpacity>
                  <Text style={styles.linkable}>Video do evento</Text>
                </View>
              </View>  




              <View style={styles.cardSocialMedia}>
                <TouchableOpacity onPress={() => { Linking.openURL(socialmedia.instagram) }}>
                  <Icon name="instagram" size={50} color="#0d1b2a" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Linking.openURL(socialmedia.twitter) }}>
                  <Icon name="twitter-square" size={50} color="#0d1b2a" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Linking.openURL(socialmedia.facebook) }}>
                  <Icon name="facebook-square" size={50} color="#0d1b2a" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Linking.openURL(`https://wa.me/${zap}`) }}>
                  <Icon name="whatsapp" size={50} color="#0d1b2a" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Linking.openURL(`mailto:${socialmedia.email}`) }}>
                  <Icon name="envelope" size={50} color="#0d1b2a" />
                </TouchableOpacity>
              </View>

              <View style={styles.cardCosts}>
                <Text style={styles.costs}>Preços variam de:</Text>
                <Text style={styles.costs}>R${costInitial} a R${costFinal}</Text>

                <Text style={styles.costs}>Compre Online</Text>
                <TouchableOpacity onPress={() => { Linking.openURL(`https://wa.me/${zap}`)}}>
                  <Icon name="credit-card" size={50} color="#e0e1dd" />
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        );
      }

}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d1b2a',
  },
  image: {
    width:360,
    height:200,
    resizeMode:'stretch',
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e1dd',
    fontFamily: 'monospace',
  },
  cardTitle: {
    backgroundColor: '#415a77',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: '100%',
    elevation: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#e0e1dd',
  },
  cardDetails: {
    backgroundColor: '#778da9',
    borderRadius: 8,
    paddingVertical: 15,
    width: '95%',
    marginVertical: 5,
    elevation: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e1dd',
    },
  details: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0d1b2a',
    fontFamily: 'monospace',
  },
  cardLocation: {
    backgroundColor: '#415a77',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: '95%',
    marginVertical: 5,
    elevation: 50,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#e0e1dd',
  },
  linkable: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#e0e1dd',
    fontFamily: 'monospace',
  },
  cardSocialMedia: {
    backgroundColor: '#778da9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: '95%',
    marginVertical: 5,
    elevation: 30,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#e0e1dd',
  },
  cardCosts: {
    backgroundColor: '#415a77',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: '95%',
    marginVertical: 5,
    elevation: 30,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#e0e1dd',
  },
  costs:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e0e1dd',
    fontFamily: 'monospace',
  }

});
  