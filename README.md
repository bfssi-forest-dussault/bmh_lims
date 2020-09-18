# BMH LIMS
Welcome to the LIMS for BMH. Built with [Cookiecutter Django](https://github.com/pydanny/cookiecutter-django/).

## Getting Started
**Reminder to set up a virtual environment**
### Step 1: Install Dependencies
To install all dependencies, run the following from the root directory:
```
pip install -r requirements/base.txt -r requirements/local.txt
cd bmh_lims/frontend && npm i
cd ../..
```
Essentially, we're installing all dependencies for the backend, then installing all frontend dependencies and returning to the root directory.

### Step 2: Run Migrations
Next, we set up the database and run migrations:
```
createdb bmh_lims
python manage.py makemigrations
python manage.py migrate
python manage.py makemigrations database
python manage.py migrate database
```
For more information, refer to [Django's official documentation](https://docs.djangoproject.com/en/3.1/topics/migrations/)

### Step 3: Create an admin
Finally, you will need to create an admin account to update the internal content. Refer to [these docs](https://djangocentral.com/creating-super-user-in-django/) to create a superuser.


## Running the app
Both the frontend and backend need to be running simultaneously for the app to work.
From the root directory, run
```
python manage.py runserver
```
In a different terminal navigate to `bmh_lims/frontend` and run the following:
```
npm run dev
```
