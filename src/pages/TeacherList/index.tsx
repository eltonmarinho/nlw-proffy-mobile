import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
//import { Keyboard } from 'react-native'; 
import AsyncStorage from '@react-native-community/async-storage'


import styles from './styles'
import PageHeader from '../../Components/PageHeader'
import TeacherItem, { Teacher } from '../../Components/TeacherItem'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import api from '../../Services/api'


function TeacherList() {

    
    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])
    const [ isFiltersVisible, setIsFilterVisible] = useState(false)

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if (response){
                const favoredTeachers = JSON.parse(response)

                const favoredTeachersIds = favoredTeachers.map((teacher: Teacher) =>{
                    return teacher.id
                })

                setFavorites(favoredTeachersIds)
            }
        })
    }


    function handleToggleFilterVisible(){
        setIsFilterVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit(){

        loadFavorites()

        const response = await api.get('Classes', {
            params: { 
                subject,
                week_day,
                time,
            }
        })
        console.log(response.data)

        setIsFilterVisible(false)
        //Keyboard.dismiss()

        setTeachers(response.data);
    }

    
    
    return (
        <View style={styles.container}>
                <PageHeader 
                title="Availables Proffs"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilterVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}
                >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}> Materia </Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Subject?"
                            placeholderTextColor='#c1bccc'
                        />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput 
                                style={styles.input}
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                                placeholder="day?"
                                placeholderTextColor='#c1bccc'
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horario</Text>
                            <TextInput 
                                style={styles.input}
                                value={time}
                                onChangeText={text => setTime(text)}
                                placeholder="Hour?"
                                placeholderTextColor='#c1bccc'
                            />
                        </View>
                    </View>

                    <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                        <Text style={styles.submitButtonText} >Filtrar</Text>
                    </RectButton>
                    </View>
                    )}
            </PageHeader>
            <ScrollView
              style={styles.teacherList} 
              contentContainerStyle={{
                  paddingHorizontal:16,
                  paddingBottom:24
              }} 
            >
                {teachers.map((teacher: Teacher) => {
                return (
                <TeacherItem 
                key={teacher.id} 
                favored={favorites.includes(teacher.id)}
                teacher={teacher}/>)
                })}
                
            </ScrollView>
            
        </View>
    )
}

export default TeacherList