// import Vue from 'vue';
import Vuex from 'vuex';
import actionCreator from './actionCreator';
import _ from 'lodash';
import Cookies from 'js-cookie'
// Vue.use(Vuex);

const authStore = new Vuex.Store({
    state: {
        authUser: {},
        isLogin: false,
        token: null,
        users: [],
        pagination: {},
        userAction: {
            created: {
                type:'success',
                isShow: false,
                message: ''
            },
            updated: {
                type:'success',
                isShow: false,
                message: ''
            },
            deleted: {
                type:'success',
                isShow: false,
                message: ''
            },
            error: {
                type:'danger',
                isShow: true,
                message: 'Wrong action!'
            }
        }
    },
    mutations: {
        LOGIN(state, authUser, token, isLogin = true) {
            state.authUser = authUser;
            state.token = token;
            state.isLogin = isLogin;
        },
        LOGOUT(state, isLogin = false) {
            state.authUser = {};
            state.isLogin = isLogin
        },
        FETCH_USERS(state, body) {
            state.users = body;
        },
        INSERT_USER(state, user) {
            console.log(user, state.users);
            state.users.push(user)
        },
        UPDATE_USER(state, body) {
            
        },
        UPDATE_USER_ACTION(state,type) {
            console.log(type)
            switch (type) {
                case 'create':
                    state.userAction.created = {
                        type:'success',
                        isShow: true,
                        message: 'Create is successfully!'
                    };
                    break;
                case 'update':
                    state.userAction.updated = {
                        type:'success',
                        isShow: true,
                        message: 'Update is successfully!'
                    };;
                    break;
                case 'delete':
                    state.userAction.deleted = {
                        type:'success',
                        isShow: true,
                        message: 'Delete is successfully!'
                    };
                    break;
                default:
                    state.userAction = {
                        created: {
                            type:'success',
                            isShow: false,
                            message: ''
                        },
                        updated: {
                            type:'success',
                            isShow: false,
                            message: ''
                        },
                        deleted: {
                            type:'success',
                            isShow: false,
                            message: ''
                        },
                        error: {
                            type:'danger',
                            isShow: true,
                            message: 'Wrong action!'
                        }
                    }
                    break;
            }
        },
        CLEAR_USER_ACTION(state) {
            state.userAction = {
                created: {
                    type:'success',
                    isShow: false,
                    message: ''
                },
                updated: {
                    type:'success',
                    isShow: false,
                    message: ''
                },
                deleted: {
                    type:'success',
                    isShow: false,
                    message: ''
                },
                error: {
                    type:'danger',
                    isShow: false,
                    message: ''
                }
            }
        }
    },
    actions: {
        login({commit}, loginCredentinal) {
            return actionCreator.login(loginCredentinal).then((response) => {
                if (!_.isEmpty(response.user) && !_.isUndefined(response.user)) {
                    const authUser = response.user;
                    const token = response.token;
                    Cookies.set('token', token)
                    commit('LOGIN', authUser, token);
                }
            })
        },
        getUsers({commit}, params = null) {
            return actionCreator.getUsers(params).then( (res) => {
                if (!_.isEmpty(res.data)) {
                    commit('FETCH_USERS', res.data);
                }
            })
        },
        createUser({commit}, body) {
            return actionCreator.storeUser(body).then( (res) => {
                console.log(res, res.data);
                if (!_.isEmpty(res) && res.status === 200) {
                    console.log(res)
                    commit('UPDATE_USER_ACTION', 'create');
                } else {
                    const error = {
                        type:'danger',
                        isShow: true,
                        message: "Faileddddd."
                    }
                    commit('UPDATE_USER_ACTION', error);
                }
            })
        },
        updateUser({commit}, body) {
            return actionCreator.updateUser(body).then( (res) => {
                console.log(res);
                if (!_.isEmpty(res) && res.status === 200) {
                    commit('UPDATE_USER_ACTION', 'update');
                } else {
                    const error = {
                        type:'danger',
                        isShow: true,
                        message: "Faileddddd."
                    }
                    commit('UPDATE_USER_ACTION', error);
                }
            })
        },
        clearUserAction({commit}) {
            return commit('CLEAR_USER_ACTION');
        },
        destroyUser({commit}, id) {
            return actionCreator.destroyUser(id).then((res) => {
                if (!_.isEmpty(res) && res.status === 200) {
                    commit('UPDATE_USER_ACTION', 'delete');
                } else {
                    const error = {
                        type:'danger',
                        isShow: true,
                        message: "Faileddddd."
                    }
                    commit('UPDATE_USER_ACTION', error);
                }
            })
        }
    },
    getters: {
        getUsers(state) {
            return state.users;
        },
        getUserAction(state) {
            return state.userAction
        },
        getToken(state) {
            return state.token
        }
    }
});
export default authStore;