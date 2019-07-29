import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList
} from 'react-native';
import Post from './src/components/Post';

class InstaluraMobile extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch("https://instalura-api.herokuapp.com/api/public/fotos/alots")
      .then(resposta => resposta.json())
      .then(json => this.setState({ fotos: json }))
      .catch(e => {
        console.warn("Não foi possível carregar as fotos: " + e);
        this.setState({ status: "ERRO" });
      });
  }

  render() {
    return (
      <FlatList style={styles.container}
          keyExtractor={item => String(item.id)}
          data={this.state.fotos}
          renderItem={ ({item}) =>
            <Post foto={item}/>
          }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
});

export default InstaluraMobile;
