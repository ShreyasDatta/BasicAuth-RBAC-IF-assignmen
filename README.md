# Role-based access control and Authentication API

<!-- ROADMAP -->
## Roadmap
- [X] connected the MongoDB Cluster to the Application
- [X] made a User model and corresponding registration schema and endpoint functions
- [X] added 3 heirarchy roles and corresponding scopes.
    - [X] basic
        - can read Own data(resource/profile)
        - can update Own data(resource/profile)
    - [X] supervisor
        - extends basic scope
        - can read Any data(resource/profile)
    - [X] admin
        - extends basic and supervisor scope
        - can update Any data(resource/profile)
        - can delete Any data(resource/profile)
- [X] Following endpoints implemented:
    - User
    ```sh
        User / Sign up (no scope needed)
        User / Sign in (no scope needed)
        User / Get All (user-get)
        User / Get Single (user-get)
    ```
    - Role
    ```sh
        Role / Get All (readAny)
        Role / Get Single (readyAny{:id})
        Role / update Any (updateAny)
        Role / delete Any (deleteAny)
    ```
- [ ] Further work on the remaining model and its endpoint functions pending:
    - School
    ```sh
        School / Get All (readAny)
        School / Get Students (readyAny{:id})
        School / Create (school-create)
    ```
    - Student
    ```sh
        Student / Create (student-create)
        Student / Get All (readAny)
    ```

<!-- See the [pull requests](https://github.com/ShreyasDatta/e-Commerce-chatbot-rasa/pull/1) for a full list of proposed features and task completion roadmap. -->


