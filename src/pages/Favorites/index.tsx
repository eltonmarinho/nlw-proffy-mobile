import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, AsyncStorage } from 'react-native'
import styles from './styles'
import PageHeader from '../../Components/PageHeader'
import TeacherItem, { Teacher } from '../../Components/TeacherItem'

function Favorites() {

    const [favorites, setFavorites] = useState([])

    function loadFavorites(){

        AsyncStorage.getItem('favorites').then(response => {
            if (response){
                const favoredTeachers = JSON.parse(response)

                

                setFavorites(favoredTeachers)
            }
        })
    }

    useEffect(()=> {
        loadFavorites()
    }, [])


    return (
        <View style={ styles.container }>
                <PageHeader title="My favorites Proffs"/>


                <ScrollView
              style={styles.teacherList} 
              contentContainerStyle={{
                  paddingHorizontal:16,
                  paddingBottom:24
              }} 
            >
                {favorites.map((teacher:Teacher) =>{
                    return (
                        <TeacherItem 
                        key={teacher.id}
                        teacher={teacher}
                        favored
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Favorites