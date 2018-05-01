import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
} from 'react-vr';

export default class nodeVR extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('sky.jpg')}/>
        <Text
          style={{
            backgroundColor: 'transparent',
            color: "black",
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          welcome
        </Text>
        
        <View style={{ backgroundColor: "green", layoutOrigin: [0.5, 0.5], transform: [{translate: [0, 1, 4]}] }}>
          <Text style={{
            color: "black", 
            fontWeight: "400", 
            fontSize: 0.5
            }}>down</Text>
        </View>
        {/* <VrButton style={{ opacity: 1, width: 1, color: "teal" }} onClick={() => console.log('clicked')}>
          <Text style={{
          color: "black",
          fontSize: 0.5,
          fontWeight: "500",
          opacity: 1
          }}>down</Text>
        </VrButton> */}
          
        {/* back */}
        <View style={{
          backgroundColor: "blue",
          layoutOrigin: [0.5, 0.5],
          transform: [{translate: [0, 1, 3]}, {rotateY: 180}]
        }}>
          <Text style={{
            textAlign: "center",
            textAlignVertical: "center"
          }}>hey</Text>
        </View>

      </View>
    );
  }
};

AppRegistry.registerComponent('nodeVR', () => nodeVR);
