import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { View, List, ListItem, Icon, Left } from 'native-base';

export const SearchResults = () => {
    return (
        <View style={styles.searchResultsWrapper}>
            <List>
                <ListItem button avatar>
                    <Left>
                        <Icon style={styles.leftIcon} name='location' type="EvilIcons" /> 
                    </Left>
                    <Text>1</Text>
                </ListItem>
                <ListItem>
                    <Text>1</Text>
                </ListItem>
            </List>
        </View>
    );
}

const styles = StyleSheet.create({
    searchResultsWrapper: {
        top: 160,
        position: 'absolute',
        width: '100%',
        height:1000,
        backgroundColor: '#fff',
        opacity: 0.9
    },
    primaryText: {
        fontWeight: 'bold',
        color: '#373737',
    },
    secondaryText: {
        fontStyle: 'italic',
        color: "#7D7D7D",
    },
    leftContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderLeftColor: '#7D7D7D',
    },
    leftIcon: {
        fontSize: 28,
        color: '#7D7D7D',
    },
    distance: {
        fontSize: 12
    }
});

export default SearchResults;