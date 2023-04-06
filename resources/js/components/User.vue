<template>
    <div class="container-fluid">
        <div class="header">
            <h4 class="header-text">
                User Managerment
            </h4>
        </div>
        <div class="filter-block">
            <div class="row">
                <div class="col-md-4">
                    <label for="name" class="label col-md-1">Name</label>
                    <input type="text" name="name" id="name" class="form-control" placeholder="search by name"
                        v-model="searchParams.name">
                    <p class="text text-danger"></p>
                </div>
                <div class="col-md-4">
                    <label for="email" class="label col-md-1">Email</label>
                    <input type="text" name="email" id="email" class="form-control" placeholder="search by email"
                        v-model="searchParams.email">
                    <p class="text text-danger"></p>
                </div>
                <div class="col-md-3">
                    <p class=""></p>
                    <button class="btn btn-outline-danger mr-2" type="button" id="search" @click="search">Search</button>
                    <button class="btn btn-outline-primary" type="button" id="clear" @click="clear">Clear</button>
                </div>
            </div>
        </div>
        <div class="action-block">
            <div class="form-group">
                <button class="btn btn-primary" @click="openModal()" data-bs-toggle="modal" data-bs-target="#user-modal">New</button>
            </div>
        </div>
        <div class="block">
            <div class="table-reponsive">
                <table cellpadding="" class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified at</th>
                            <th>Created at</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users">
                            <td>{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.email_verified_at }}</td>
                            <td>{{ dateTime(user.created_at) }}</td>
                            <td>user</td>
                            <td>
                                <div class="form-group">
                                    <div class="d-flex">
                                        <button class="btn btn-outline-primary m-2" data-bs-toggle="modal" data-bs-target="#user-modal" @click="showModal(user)"
                                            >
                                            <!-- <font-awesome-icon class="fas fa-phone"></font-awesome-icon> -->
                                            <span class="text text-smal">Edit</span>
                                        </button>
                                        <button class="btn btn-outline-danger m-2" data-bs-toggle="modal" data-bs-target="#delete-modal" @click="confirmDelete(user)">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <!-- Modal -->
                <div class="modal" id="user-modal" tabindex="-1" aria-labelledby="exampleModalLabel" ref="modalRef"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"><label for="">{{ typeAction }} User</label></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                               <form action="" name="userForm">
                                    <div class="content">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <label for="">Họ và tên</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <input type="text" name="name" id="name" class="form-control" v-model="editUser.name">
                                                    <p class="text text-danger"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <label for="">Email</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <input type="text" name="email" id="email" class="form-control" v-model="editUser.email">
                                                    <p class="text text-danger"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <label for="">Mật khẩu</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <input type="password" name="name" id="name" class="form-control" v-model="editUser.password">
                                                    <p class="text text-danger"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                               </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" @click="handleSubmit()">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" v-for="link in links" v-bind:class="{ active: link.active }"><a class="page-link"
                            @click="changePage(link.url)"><span v-html="link.label"></span></a></li>
                </ul>
            </nav>
        </div>
        <div class="modal" id="delete-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"><label for="">Are you delete this user?</label></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                    <div class="content">
                                        <div class="form-group" v-html="confirmText">
                                        </div>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger" @click="destroyUser(selectedIndex)">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
        <Toast></Toast>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import { createToast } from 'mosha-vue-toastify';
import { Modal } from 'bootstrap';
import { ref } from 'vue';

export default {
    name: 'UserComponent',
    setup() {
        const modalRef = ref(null);
        const closeModal = () => Modal.getInstance(modalRef.value)?.hide();
        return { modalRef, closeModal }
    },
    data() {
        return {
            users: [],
            editUser: null,
            typeAction: 'create',
            isLoading: false,
            isSearching: false,
            data: {},
            links: {},
            searchParams: {
                name: '',
                email: '',
                type: 0,
            },
            editUser: {
                'id' : null,
                'name': null,
                'email' : null,
                'password': null
            },
            confirmText: "",
            selectedIndex: null
        }
    },
    computed: {
        ...mapState(['users', 'userAction'], {
            notification : 'getUserAction'
        })
    },
    created() {
        console.log('Welcome to User Component')
        this.initial()
    },
    methods: {
        initial() {
            this.getUsers();
        },
        setUsers() {
            this.users = this.$store.state.users;
        },
        search() {
            const params = this.searchParams;
            const name = params.name || null
            const email = params.email || null
            const type = params.type || null
            let paramString = ''
            if (name) {
                paramString += `&name=${name}`;
            }
            if (email) {
                paramString += `&email=${email}`;
            }

            this.getUsers(paramString);

        },
        clear() {
            this.resetForm();
            this.getUsers()

        },
        resetForm() {
            //reset searchParams
            this.searchParams = {
                name: '',
                email: '',
                type: 0,
            }
        },
        dateTime(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
        changePage(url) {
            const tmp = url.split('?');
            const paramString = tmp[1];
            this.getUsers(paramString);
        },
        async getUsers(paramString = null) {
            await this.$store.dispatch('getUsers', paramString);
            this.data = this.$store.state.users;
            this.users = this.data.data;
            this.links = this.data.links;
        },
        showModal(user = null) {

            if (user) {
                delete user.password;
                this.editUser = user;
                this.typeAction = "Edit"
            } else {
                this.typeAction = "Create"
            }
        },
        openModal() {
            this.resetEditUser()
            this.showModal()
        },
        resetEditUser() {
            this.editUser = {
                'id': null,
                'name': null,
                'email': null,
                'password': null
            }
        },
        handleSubmit() {
            const action = this.typeAction.toLowerCase();
            const user = this.editUser;
            if (action === 'edit') {
                this.updateUser()
            }
            if (action === 'create') {
                this.createUser()
            }
        },
        async updateUser() {
            const user = this.editUser;
            if (typeof user.id === null) {
                console.error('id is null')
                return false
            } else {
                await this.$store.dispatch('updateUser', user);
            }
            if (this.userAction.updated.isShow) {
                this.toast();
            }
        },
        async createUser() {
            let user = this.editUser;
            delete user.id;
            const res  = await this.$store.dispatch('createUser', user);
            console.log(res);
            if (this.userAction.created.isShow) {
                const toast = {
                    message: "Succes",
                    type: 'success',
                    
                }
                this.toast();
            } else {
                this.toast();
            }
            console.log(res)
        },
        clearAction() {
            this.$store.dispatch('clearUserAction');
            this.closeModal();
        },
        toast(toast = null) {
            if (toast) {
                createToast(toast.message, {
                type: toast.type,
                timeout: 3000,
                onClose: this.clearAction()
            })} else {
                console.log(this.userAction);
                createToast(this.userAction.created.message, {
                    type: this.userAction.type,
                    timeout: 3000,
                    onClose: this.clearAction()
                });
            }
        },
        destroyUser(id) {
            this.$store.dispatch('destroyUser',{id: id});
            if (this.userAction.deleted.isShow) {
                const toast = {

                }
                this.toast();
            }
        },
        confirmDelete(user = null) {
            const confirmText = `Are you want to delete <strong>${user.name}</strong>?`
            this.confirmText = confirmText;
            this.selectedIndex = user ? user.id : null;
        }
    }
}
</script>

<style scoped>
.header-text {
    padding: 1rem 0.5rem;
    margin-bottom: 1rem;
    font-size: 20px;
}

.form-control {
    background-color: #f5f5f5 !important;
    color: black !important;
    font-weight: normal !important;
    padding-left: 1rem;
}

.btn {
    font-size: 14px;
}</style>