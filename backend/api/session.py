import uuid

# Stores active quiz sessions
active_sessions = {}


def create_session(movie):

    session_id = str(uuid.uuid4())

    active_sessions[session_id] = movie

    return session_id


def get_session(session_id):

    return active_sessions.get(session_id)


def delete_session(session_id):

    if session_id in active_sessions:

        del active_sessions[session_id]