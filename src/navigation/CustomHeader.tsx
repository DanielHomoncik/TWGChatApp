import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Svg, { Path, Circle, Defs } from 'react-native-svg';

const CustomHeader: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const showBackButton = route.name === 'Chat';

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 18L9 12L15 6"
              stroke="#6A0DAD"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      )}
      <View style={[styles.titleContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: showBackButton ? 'center' : 'flex-start' }]}>
        {showBackButton ? (
          <>
            <Svg width="40" height="40" viewBox="0 0 64 64" fill="none" style={styles.chatIcon}>
              <Circle cx="32" cy="32" r="32" fill="#E9EAEE" />
              <Defs>
                <Circle cx="100" cy="100" r="100" fill="#E9EAEE" />
              </Defs>
              <Path d="M32 32C38.6274 32 44 26.6274 44 20C44 13.3726 38.6274 8 32 8C25.3726 8 20 13.3726 20 20C20 26.6274 25.3726 32 32 32Z" fill="#BFC1CC" />
              <Path d="M32 32C51.33 32 67 47.67 67 67C67 86.33 51.33 102 32 102C12.67 102 -3 86.33 -3 67C-3 47.67 12.67 32 32 32Z" fill="#BFC1CC" />
            </Svg>
            <Text style={styles.headerTitleChat}>The Widlarz Group</Text>
          </>
        ) : (
          <Text style={styles.headerTitleRooms}>Rooms</Text>
        )}
      </View>
      {showBackButton ? (
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Svg width="54" height="54" viewBox="0 0 44 44" fill="none">
              <Circle cx="22" cy="22" r="22" fill="white" />
              <Path
                d="M29.5024 24.7629C28.7073 23.978 27.7147 23.978 26.9247 24.7629C26.322 25.3605 25.7194 25.9581 25.1269 26.5659C24.9648 26.733 24.8281 26.7684 24.6306 26.657C24.2406 26.4443 23.8253 26.2721 23.4506 26.0392C21.7034 24.9402 20.2398 23.5273 18.9433 21.9371C18.3001 21.147 17.7279 20.3013 17.3278 19.3492C17.2468 19.1567 17.262 19.0301 17.4189 18.8731C18.0216 18.2907 18.6091 17.6931 19.2016 17.0956C20.0271 16.265 20.0271 15.2927 19.1965 14.457C18.7255 13.981 18.2546 13.5151 17.7836 13.039C17.2974 12.5529 16.8163 12.0616 16.3251 11.5805C15.53 10.8057 14.5373 10.8057 13.7473 11.5856C13.1396 12.1832 12.5572 12.7959 11.9393 13.3834C11.3671 13.9253 11.0784 14.5887 11.0176 15.3636C10.9214 16.6246 11.2303 17.8147 11.6659 18.9744C12.5572 21.3749 13.9144 23.507 15.5603 25.4618C17.7836 28.1054 20.4373 30.197 23.5417 31.7061C24.9395 32.3848 26.3879 32.9064 27.9629 32.9925C29.0466 33.0533 29.9886 32.7798 30.7432 31.934C31.2598 31.3567 31.8422 30.83 32.3891 30.278C33.1994 29.4576 33.2045 28.465 32.3992 27.6547C31.437 26.6874 30.4697 25.7252 29.5024 24.7629Z"
                fill="#5603AD"
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Svg width="54" height="54" viewBox="0 0 44 44" fill="none">
              <Circle cx="22" cy="22" r="22" fill="white" />
              <Path
                d="M23.643 15H12.357C11.6107 15 11 15.7378 11 16.6601V27.3399C11 28.253 11.6031 29 12.357 29C22.8551 29 22.0949 29 23.643 29C24.3893 29 25 28.2622 25 27.3399V16.6601C25 15.747 24.3893 15 23.643 15Z"
                fill="#5603AD"
              />
              <Path
                d="M32.3523 15.2047C31.9456 14.9483 31.4485 14.9328 31.0267 15.1581L27.178 17.2174C26.7939 17.4194 26.5529 17.8313 26.5529 18.282V25.7264C26.5529 26.1771 26.7939 26.5812 27.178 26.791L31.0267 28.8503C31.4485 29.0756 31.9456 29.0601 32.3523 28.8036C32.759 28.5472 33 28.0965 33 27.6147V16.4014C33 15.9119 32.7515 15.4612 32.3523 15.2047Z"
                fill="#5603AD"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Svg width="54" height="54" viewBox="0 0 44 44" fill="none">
              <Circle cx="22" cy="22" r="22" fill="white" />
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.4003 31.3493L27.7053 25.6262C34.5487 14.3252 20.7634 5.19905 12.7904 12.7831C5.05171 21.4967 14.7403 34.3726 25.6054 27.7354L31.3004 33.3039C32.9456 35.1132 35.0502 33.0039 33.4003 31.3493ZM19.6666 12.9799C28.6615 12.9799 28.9521 26.5261 19.6666 26.5261C10.6249 26.5261 10.8827 12.9799 19.6666 12.9799Z"
                fill="#5603AD"
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Svg width="54" height="54" viewBox="0 0 44 44" fill="none">
              <Circle cx="22" cy="22" r="22" fill="white" />
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.526 14.4762C14.526 10.507 19.6205 8.15277 22.6197 11.8442C20.2796 12.767 18.2079 15.6862 19.0931 18.9492C19.079 18.9492 19.0649 18.9515 19.0507 18.9539C19.0366 18.9562 19.0225 18.9586 19.0084 18.9586C16.5318 18.9586 14.526 16.9528 14.526 14.4762ZM29.5176 17.4896C29.5176 19.9651 27.5107 21.972 25.0352 21.972C22.5596 21.972 20.5527 19.9651 20.5527 17.4896C20.5527 15.014 22.5596 13.0071 25.0352 13.0071C27.5107 13.0071 29.5176 15.014 29.5176 17.4896ZM34 30.1787C34 35.405 16.0797 35.405 16.0797 30.1787C16.0797 20.9407 34 21.0349 34 30.1787ZM19.6123 20.3052C11.3349 19.1705 6.01434 28.7756 13.7832 30.4142C13.8586 26.0024 17.211 23.3186 21.312 22.3298C20.6057 21.7883 20.0266 21.1009 19.6123 20.3052Z"
                fill="#5603AD"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#B6DEFD',
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 55,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  backText: {
    color: '#6A0DAD',
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
  },
  headerTitleRooms: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
  },
  headerTitleChat: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 8,
  },
  chatIcon: {
    marginRight: 10,
  },
});

export default CustomHeader;
