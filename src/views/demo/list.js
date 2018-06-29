import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, List, FlatList, SectionList, TouchableOpacity } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Button, Card, Toast } from 'antd-mobile';
import Http from "../../utils/http";
import Config from "../../utils/config";

import SearchBar from "../components/searchbar";

export default class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            start: 0,
            length: 10,
            total: 10,
            dataList: [],
            refreshing: false,
        };

        this.nav = this.props.navigation.navigate;
    }

    componentWillMount = () => {
        this.getDataList(this.state.key);
    }

    componentWillUnmount = () => {
    }

    startSearch = (key) => {
        this.setState({
            start: 0,
            length: 10,
            total: 10,
            key: key,
            dataList: [],
        }, () => {
            this.getDataList(key)
        })
    }

    getDataList = (key) => {
        if (this.state.start >= this.state.total) {
            Toast.info("没有更多数据了！", 2, null, false);
            return;
        }

        var d = { Rows: [], Total: this.state.start + 11 };
        for (i = 0; i < 10; i++) {
            d.Rows.push({
                ID: "ID" + this.state.start + i,
                Title: "Title" + this.state.start + i,
                Body: 'Body' + this.state.start + i,
                Note: "Note" + this.state.start + i,
            });
        }

        this.setState({
            start: this.state.start + this.state.length,
            total: d.Total,
            dataList: this.state.dataList.concat(d.Rows),
            key: key,
        });
    }

    refreshDataList = () => {
        Toast.info("刷新了数据", 2, null, false);
    }

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.refreshDataList(this.state.key);
        this.setState({ refreshing: false });
    }

    onEndReached = () => {
        if (this.state.start == 0) return;
        this.getDataList(this.state.key);
    }

    render() {
        return (
            <View style={styles.listContainer}  >
                <SearchBar placeholder="关键字" onSubmit={(key) => { this.startSearch(key) }} />
                <FlatList data={this.state.dataList} onEndReached={this.onEndReached} onEndReachedThreshold={0.1}
                    onRefresh={this.onRefresh} refreshing={this.state.refreshing}
                    keyExtractor={(item, index) => { return item.ID }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.cardContainer} key={index} activeOpacity={0.5} onPress={() => { this.nav("detail", { ID: item.ID }) }}>
                                <Card>
                                    <Card.Header title={item.Title} extra="副标题" thumb={<Image source={require('../../wwwroot/image/avatar.jpg')} style={styles.cardAvatar} />} />
                                    <Card.Body style={styles.cardBody}>
                                        <Text>{item.Body}</Text>
                                    </Card.Body>
                                    <Card.Footer content={item.Note} extra="其他信息" />
                                </Card>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flex:1,
        backgroundColor: Config.BackgroundColor,
        paddingHorizontal: 8,
    },
    cardContainer: {
        marginBottom: 10
    },
    cardAvatar: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    cardBody: {
        paddingHorizontal: 15,
    },
});
