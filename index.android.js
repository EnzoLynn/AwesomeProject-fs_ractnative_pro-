/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var test = require('./test.js');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView
} = React;
//var req_url = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json";//"http://192.168.100.112:818/data/movies.json";
var req_url = "http://192.168.100.112:818/data/movies.json";

var AwesomeProject = React.createClass({
  getInitialState: function() { 
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      movies: null,
      dd:test 
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(req_url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          movies: responseData.data,
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
          dd:test 

        });
      })
      .done();
  },
  render: function() {
    if (!this.state.movies) {
      return this.renderLoadingView();
    }
   
    return (
     
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      >


        
      </ListView>
    );


  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
          <Text>
            Loading movies...
          </Text>
        </View>
    );

  },
  renderMovie: function(movie) {

    return (

      <View style={styles.container}> 
            <Image
              source={{uri: movie.posters.thumbnail}}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{movie.title}{this.state.dd} </Text>
              <Text style={styles.year}>{movie.year}</Text>
            </View>
          </View>


    );

  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});



AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);