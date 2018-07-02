<template>
    <div>
        <div class="editProfileContainer">
            <NavBarStandard />
            <div class="editFields">
                <div class="promptMessages">
                    <header class="firstNamePrompt">First Name:</header>
                    <header class="lastNamePrompt">Last Name:</header>
                    <header class="descriptionPrompt">Description:</header>
                </div>
                <div class="changeFields">
                    <input type="text" v-model="firstName" :placeholder="this.user.firstName"/>
                    <input class="lastNameInput" v-model="lastName" type="text" :placeholder="this.user.lastName"/>
                    <textarea class="descriptionInput" v-model="description" rows="5" cols="50" maxlength="200"
                        :placeholder="this.user.description"></textarea>
                </div>
            </div>
            <div class="submissionFields">
                <button class="cancelButton" v-on:click="cancel">Cancel</button>
                <button class="submitButton" v-on:click="submit">Save</button>
            </div>
            <div class="background">
            </div>
        </div>
    </div>
</template>

<script>
    import NavBarStandard from '../components/NavBarStandard.vue'

    export default {
        name: 'editprofile',
        components: {
            NavBarStandard
        },
        props: ['user'],
        data: function() {
            return {
                firstName: '',
                lastName: '',
                description: '',
                edited: {},
            }
        },
        created: function() {
            this.$store.dispatch('isLoggedIn')
            .then(res => {
                if (!res.loggedIn) {
                    alert("No logged in user!")
                    this.$router.push({
                        name: 'landingPage'
                    });
                }
                else {
                    this.user = res.user
                }
            })
        },
        methods: {
            cancel() {
                this.$router.push({
                    name: 'profile',
                    params: {
                      user: this.$store.getters.currentUser,
                    }
                });
            },
            submit() {
                this.edited.username = this.user.username;
                if (this.firstName !== this.user.firstName && this.firstName !== "") {
                    this.edited.firstName = this.firstName;
                }
                if (this.lastName !== this.user.lastName && this.lastName !== "") {
                    this.edited.lastName = this.lastName;
                }
                if (this.description !== this.user.description && this.description !== "") {
                    this.edited.description = this.description;
                }
                if (this.edited.firstName || this.edited.lastName || this.edited.description) {
                    this.$store.dispatch('editUser', this.edited)
                    .then(res => {
                        if (res) {
                            this.$router.push({
                                name: 'profile',
                                params: {
                                  user: res,
                                }
                            });
                        } else {
                            alert('Unable to edit');
                        }
                    });
                }
                else {
                    alert('Nothing to update!');
                }
            }
        }


    }
</script>

<style scoped>
    input {
        width: 20%;
        height: 30px;
        padding-left: 20px;
        padding-right: 20px;
        background: #000000;
        color: #FFFFFF;
        border: 1px solid #D34084;
        border-radius: 5px;
        font-size: 15px;
    }
    textarea {
        resize: none;
        padding-left: 20px;
        padding-right: 20px;
        width: 80%;
        background: #000000;
        color: #FFFFFF;
        border: 1px solid #D34084;
        border-radius: 5px;
        font-size: 15px;
    }
    textarea:focus {
        outline: none;
    }
    button {
        padding: 10px 20px;
        font-size: 14px;
        border: 2px solid #D34084;
        border-radius: 5px;
        background: #D34084;
        color: #FFFFFF;
    }
    .editProfileContainer {
    }
    .editFields {
        display: flex;
        width: 600px;
        margin: 0 auto;
        margin-top: 200px;
        height: 320px;
        color: #FFFFFF;
        font-size: 20px;
    }
    .promptMessages {
        flex-grow: 1;
    }
    .changeFields {
        flex-grow: 2;
        text-align: center;
    }
    .firstNamePrompt {
    }
    .lastNamePrompt {
        margin-top: 67px;
    }
    .descriptionPrompt {
        margin-top: 68px;
    }
    .lastNameInput {
        margin-top: 50px;
    }
    .descriptionInput {
        margin-top: 50px;
    }
    .submissionFields {
        width: 600px;
        margin: 0 auto;
        justify-content: space-around;
        display: flex;
    }
    .background {
        position: absolute;
        top: 0;
        right: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: #0C1012;
    }
</style>
