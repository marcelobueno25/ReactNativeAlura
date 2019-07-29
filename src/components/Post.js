import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput
} from "react-native";

const width = Dimensions.get("screen").width;

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto: { ...this.props.foto },
      valorComentario: ""
    };
  }

  like() {
    const { foto } = this.state;
    let novaLista = [];
    if (!foto.likeada) {
      novaLista = [...foto.likers, { login: "meuUsuario" }];
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login != "meuUsuario";
      });
    }

    const fotoAtualizada = {
      ...this.state.foto,
      likeada: !this.state.foto.likeada,
      likers: novaLista
    };
    this.setState({ foto: fotoAtualizada });
  }

  carregarIcone(likeada) {
    return likeada
      ? require("../../resources/img/s2-checked.png")
      : require("../../resources/img/s2.png");
  }

  exibeLikes(likers) {
    if (likers.length <= 0) return;
    return (
      <Text style={styles.like}>
        {likers.length} {likers.length > 1 ? "curtidas" : "curtida"}
      </Text>
    );
  }

  exibeLengenda(foto) {
    if (foto.comentario === "") return;

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    );
  }

  adicionarComentario() {
    const novaLista = [
      ...this.state.foto.comentarios,
      {
        id: this.state.valorComentario,
        login: "meuUsuario",
        texto: this.state.valorComentario
      }
    ];

    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista
    };

    this.setState({ foto: fotoAtualizada, valorComentario: '' });

    this.inputComentario.clear();
  }

  render() {
    const { foto } = this.state;

    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={{ uri: foto.urlPerfil }} style={styles.fotoDePerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{ uri: foto.urlFoto }} style={styles.foto} />
        <View style={styles.rotape}>
          <TouchableOpacity onPress={this.like.bind(this)}>
            <Image
              source={this.carregarIcone(foto.likeada)}
              style={styles.buttonLike}
            />
          </TouchableOpacity>

          {this.exibeLikes(foto.likers)}
          {this.exibeLengenda(foto)}

          {foto.comentarios.map(comentario => (
            <View style={styles.comentario} key={String(comentario.id)}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          ))}
          <View style={styles.inputComentario}>
            <TextInput
              style={styles.textInput}
              placeholder="Adicione um comentario"
              underlineColorAndroid="transparent"
              ref={input => (this.inputComentario = input)}
              onChangeText={texto => this.setState({ valorComentario: texto })}
            />
            <TouchableOpacity onPress={this.adicionarComentario.bind(this)}>
              <Image
                source={require("../../resources/img/send.png")}
                style={styles.seta}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cabecalho: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  fotoDePerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40
  },
  foto: {
    width: width,
    height: width
  },
  buttonLike: {
    width: 32,
    height: 32
  },
  rotape: {
    marginHorizontal: 15,
    marginVertical: 20
  },
  like: {
    fontWeight: "bold",
    marginVertical: 5
  },
  comentario: {
    flex: 1,
    flexDirection: "row"
  },
  tituloComentario: {
    fontWeight: "bold",
    marginRight: 5
  },
  textInput: {
    flex: 1,
    height: 40
  },
  seta: {
    height: 25,
    width: 25,
    marginHorizontal: 10
  },
  inputComentario: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  }
});
