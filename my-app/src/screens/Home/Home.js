import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import PostContainer from '../../components/PostContainer/PostContainer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nuevoPost: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.route.params?.nuevoPost !== prevProps.route.params?.nuevoPost) {
      console.log("Se creó un nuevo post")
      this.setState({ nuevoPost: true })
    }
  }

  render() {
    return (
      <View style={ styles.container } >
        <Text>HOME</Text>
        {
          this.state.nuevoPost ?
          <PostContainer navigation={ this.props.navigation } nuevoPost={ this.state.nuevoPost }/> :
          <PostContainer navigation={ this.props.navigation } nuevoPost={ this.state.nuevoPost }/>
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", 
  },
});


export default Home;