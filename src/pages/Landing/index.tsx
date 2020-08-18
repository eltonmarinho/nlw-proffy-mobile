import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'
import api from '../../Services/api'

function Landing() {

    const {navigate} = useNavigation()

    const [totalConnections, setTotalConections] = useState(0)
    

    useEffect(() => {

        

        api.get('connections').then(response =>{
            //const total = response.data.total;
            const {total} = response.data;


            setTotalConections(total)
        })
    }, [])


    

    function handleNavigateToGiveClassesPage(){
        navigate('GiveClasses')
    }

    function handleNavigateToStudyPages(){
        navigate('Study')
    }

    return (
    <View style={styles.container}>
      <Image style={styles.banner} source={landingImg} />
    <Text style={styles.title}>Seja Bem vindo! {'\n'}
    <Text style={styles.titleBold}> O que deseja fazer?</Text>
    </Text>
    <View style={styles.buttonsContainer}>
        <RectButton onPress={handleNavigateToStudyPages} style={[styles.button, styles.buttonPrimary]}>
            <Image source={studyIcon} />
            <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton 
        onPress={handleNavigateToGiveClassesPage} 
        style={[styles.button, styles.buttonSecondary]}
        >
            <Image source={giveClassesIcon} />
            <Text style={styles.buttonText}>Dar Aulas</Text>
        </RectButton>
    </View>

    <Text style={styles.totalConnections}>        
        total de {totalConnections} conexoes ja realizadas
        <Image style={styles.imageConnections} source={heartIcon} />
    </Text>

    </View>

    )
}

export default Landing