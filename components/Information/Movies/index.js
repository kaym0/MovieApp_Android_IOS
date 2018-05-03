import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Content, Container, Card, CardItem, List, ListItem, Title, Thumbnail, Left, Right, Body } from 'native-base';
import * as localActions from '../../../redux/actions/localActions';
import * as discoverActions from '../../../redux/actions/discoverActions'
import FadeImage from 'react-native-fade-image';
import MovieInfoFooter from '../../MovieInfoFooter';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import ResponsiveImage from 'react-native-responsive-image';


const halfHeight = Dimensions.get('window').height / 2;

iterateContent = (content) => { 
  const itemToMap = content;
  return Object.values(itemToMap).map((info, i) => {
    return (
      <Text key={i}>
    { ((i+1) === Object.keys(itemToMap).length)
      ? (info.name + ".")
      : (info.name + ", ")
    }
      </Text>
    )
  })
}

renderRecommendations = (recommendations) => {
  let num = Dimensions.get('window').width / 3.8;
  return Object.values(recommendations).map((movie, i) => (
    <Container style={{flex: 1, height: undefined}} key={i}>
      <Card transparent style={styles.cardMain}>
        <View style={{flex: 1}}>
          <ResponsiveImage              
            source={{uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}`}} 
            initWidth="120"
            initHeight="176.4"
            resizeMode="cover"
            resizeMethod='auto'
          />
        </View>
        <CardItem style={{flex: 1, width: num, backgroundColor: 'transparent'}}>
          <Text numberOfLines={2} style={{flexWrap: 'wrap', color: "#74b9ff", backgroundColor: 'transparent', fontSize: 11}}>
            {movie.title}
          </Text>
        </CardItem>  
      </Card>
    </Container>
  ))
}


renderCredits = (credits) => {
  let credit_width = Dimensions.get('window').width;
  return Object.values(credits).map((credit, i) => (
    ((i+1) === Object.keys(credits).length)
    ? (
        <TouchableHighlight style={{paddingLeft: 10, paddingRight: 10}} key={i}>
          <ListItem itemDivider style={{flex: 1, backgroundColor: "transparent"}}>
            <Left style={{flex: 1}}>
              <Thumbnail source={{ uri: `https://image.tmdb.org/t/p/w300${credit.profile_path}`}}/>
            </Left>
            <Body style={{paddingLeft: 5, flex: 2}}>
              <Text style={{color: "#DBDEDF", textAlign: 'left', fontFamily: 'Nunito'}} adjustsFontSizeToFit={true}>{credit.character}</Text>
            </Body>
            <Right style={{flex: 2}}> 
              <Text style={{textAlign: 'right', color: "#DBDEDF", fontFamily: 'Nunito'}} adjustsFontSizeToFit={true}>{credit.name}</Text>
            </Right>
          </ListItem>
        </TouchableHighlight>
      )
    : (
        <TouchableHighlight style={{paddingLeft: 10, paddingRight: 10}} key={i}>
          <ListItem style={{flex: 1 }}>
            <Left style={{flex: 1}}>
              <Thumbnail source={{ uri: `https://image.tmdb.org/t/p/w300${credit.profile_path}`}}/>
            </Left>
            <Body style={{paddingLeft: 5, flex: 2}}>
              <Text style={{color: "#DBDEDF", textAlign: 'left', fontFamily: 'Nunito'}} adjustsFontSizeToFit={true}>{credit.character}</Text>
            </Body>
            <Right style={{flex: 2}}> 
              <Text style={{textAlign: 'right', color: "#DBDEDF", fontFamily: 'Nunito'}} adjustsFontSizeToFit={true}>{credit.name}</Text>
            </Right>
          </ListItem>
        </TouchableHighlight>
      )
    )
  );
}

class MovieInfo extends Component {
	 constructor(props) {
      super(props);
	 }

   componentDidMount() {
    this.props.fetch_movie_recommendations(this.props.movie_info.id);
   }
   renderStars(average) {
    let stars = average/2;
    let unfilled_stars;
    const a = [];
    let key = 1;

    while (stars > 0.99) {
      a.push(<Icon type="FontAwesome" name="star" key={key} style={styles.star_icon}/>)
      stars-=1;
      key++;
    }
    while (stars < 0.99 && stars > 0.4999) {
      a.push(<Icon type="FontAwesome"  name="star-half-empty" key={key} style={styles.star_icon} />)
      stars-=1;
      key++;
    }
    while(a.length < 5) {
      a.push(<Icon type="FontAwesome"  name="star-o" key={key} style={styles.star_icon} />)
      key++;
    }
    while (a.length>0) {
      return a;
      a.pop();
    }
  }

	 render() {
    let Genres;
    let ProductionCompanies;
    let BelongsToCollection;
    let Countries;
    let Languages;
    const width = Dimensions.get('window').width;
    const thirdWidth = width/3;

    if ((typeof this.props.movie_info.genres !== "undefined") && (this.props.movie_info.genres !== null)) {
      Genres = iterateContent(this.props.movie_info.genres);
      ProductionCompanies = iterateContent(this.props.movie_info.production_companies);
      BelongsToCollection = this.props.movie_info.belongs_to_collection.name + ". \n"
      Countries = iterateContent(this.props.movie_info.production_countries);
      Languages = iterateContent(this.props.movie_info.spoken_languages);
    }
    
    const Recommendations = renderRecommendations(this.props.recommendations);
    const Cast = renderCredits(this.props.cast);
    return (
    <View style={{backgroundColor: 'transparent', flex: 1}}>
      <Content style={styles.main_content_container}>
       <Container style={styles.container}>
        <View style={styles.top_container}>
          <View style = {styles.backdrop_container}>
            <Image source={{uri: `https://image.tmdb.org/t/p/w500${this.props.movies[this.props.display_key].backdrop_path}` }} resizeMode= 'cover' style={styles.backdrop} />
          </View>
          <View style={styles.top_half_view_container}>
            <Card transparent style={styles.card_image_container}>
              <CardItem transparent style={styles.cardItem_image}>
                <FadeImage style={styles.poster_image} source={{uri: `https://image.tmdb.org/t/p/w300${this.props.movies[this.props.display_key].poster_path}`}}/>
              </CardItem>
            </Card>
            <View style={styles.top_half_text_container}>
              <Card transparent style={styles.card_top_text}> 
                <CardItem transparent style={styles.cardItem_top_text}>
                  <Text numberOfLines={2}  style={styles.text_title}>
                    {this.props.movies[this.props.display_key].title}
                  </Text>
                </CardItem>
                <CardItem style={{flex: 2, backgroundColor: "rgba(0,0,0,0.3)", alignItems: 'flex-start',justifyContent:'center', flexDirection: 'column', flexWrap: 'wrap'}}>                  
                    <Text style={{color: "#DBDEDF", textAlign: 'center', justifyContent: 'center', flex: 0.5, alignSelf: 'center', fontWeight: 'bold', fontSize: 16}}>
                      Rating
                    </Text>
                    <Text style={{color: "#DBDEDF", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', textAlign: 'center', flex: 2}}>
                      {this.renderStars(this.props.movies[this.props.display_key].vote_average)}
                      {"\n"}
                      <Text style={{fontWeight: 'bold', fontSize: 16}}>
                        {"\n"}
                        Total Votes
                      </Text>
                      {"\n"}
                      {this.props.movies[this.props.display_key].vote_count}
                    </Text>
                  </CardItem>
                  <CardItem style={{marginTop: 10, backgroundColor: "rgba(0,0,0,0.3)", justifyContent:'center', flexDirection: 'column', flexWrap: 'wrap'}}>
                    <Text style={{color: '#DBDEDF', textAlign: 'center'}}>
                      <Text style={{fontWeight: 'bold', fontSize: 16}}>
                        Genres{"\n"}
                      </Text>
                      {Genres}
                    </Text>
                </CardItem>
              </Card>
            </View>
          </View>
        </View>
        </Container>
          <View style={{flex: 1,padding: 10}}>
            <View style={{backgroundColor: "#11131F", borderRadius: 20, padding: 8}}>
              <Title style={{fontSize: 16, color: '#74b9ff'}}>
                Synopsis
              </Title>
              <Text style={{fontFamily: 'Nunito', paddingTop: 10, alignSelf: 'flex-start', color: '#DBDEDF'}}>
                {this.props.movies[this.props.display_key].overview}
                {"\name"}
              </Text>
            </View>
            <View style={{flex: 4, marginTop: 20, flex: 1, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 20}}>             
              <Title style={{fontFamily: 'Kiona', color: "#74b9ff" }}>
                Cast
              </Title>
              <List>
                {Cast}
              </List>
            </View>
            <View style={{borderRadius: 20, padding: 10, marginTop: 40, flex: 5,backgroundColor: 'rgba(0,0,0,0.3)'}}>
              <Title style={{color: "#DBDEDF", fontFamily: "Kiona", fontSize: 16}}>
                Recommendations
              </Title>
              <ScrollView ref="_scrollView" horizontal={true} style={styles.InfiniteScrollView}>
                {Recommendations}
              </ScrollView>
            </View>
              <Text style={{color: 'white'}}>
                {"\n\n\n\n"}
                Production Companies: {ProductionCompanies}
                Belongs To Collection: {BelongsToCollection}
                Countries: {Countries}
                Languages: {Languages}
              </Text>
            </View>
          </Content>
        <MovieInfoFooter/> 
      </View>
    );
  }
}

MovieInfo.propTypes = {
  movies: PropTypes.object,
  display_key: PropTypes.number
}

const styles = StyleSheet.create({
  InfiniteScrollView: {
    flex: 1
  },
  cardMain:{
		backgroundColor: "#1E202D",
		borderColor: "#323440",
    flex: 2
	},
	cardImageContainer: {
    flex: 2,
		backgroundColor: "#1E202D", 
	},
  star_icon: {
    color: "#fdcb6e"
  },
  favorite_button: {
    color: "#fdcb6e"
  },
  text_title: {
    alignSelf: 'flex-start', 
    justifyContent: 'flex-start',
    fontFamily: 'Kiona', 
    color: '#DBDEDF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  cardItem_top_text: {
    backgroundColor: 'transparent', 
    height: "100%", 
    width: "100%",
    flex: 1,
    alignItems: 'flex-start',

  },
  card_top_text: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  main_content_container: {
    backgroundColor: "#191B28",
    flex: 1
  },
  top_half_text_container: {
    flex: 1, 
    backgroundColor: "transparent"
  },
  poster_image: {
    height: '100%', 
    width: '100%',
    borderColor: '#2d3436',
    borderWidth: 2
  },
  cardItem_image: {
    backgroundColor: "transparent", 
    height: '100%', 
    width: '100%'
  },
  card_image_container: {
    backgroundColor: "transparent", 
    flex: 1, 
    borderColor: 'grey',
    alignItems: 'flex-start',
    borderColor: 'transparent',
    padding: 20
  },
  top_half_view_container:{
    backgroundColor: "transparent",
    flexDirection: 'row', 
    flex: 1
  },
  backdrop_container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backdrop: {
    flex: 1,
    opacity: 0.5,
  },
  top_container: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    backgroundColor: "#191B28", 
    flex: 1, 
    flexDirection: 'column',
    height: halfHeight
  }
});

const mapStateToProps = (state) => ({
  movies: state.discover.movies,
  display_key: state.discover.movie_info_key,
  movie_info: state.discover.movie_info,
  recommendations: state.discover.movie_recommendations,
  cast: state.discover.cast,
  crew: state.discover.crew,
})

const mapDispatchToProps = (dispatch) => {
	 return {
    sendToLayout: (goBack) => dispatch(localActions.sendToLayout(goBack)),
    fetch_movie_recommendations: (movie_id) => dispatch(discoverActions.fetch_movie_recommendations(movie_id)),
	 }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);