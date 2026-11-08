from fastapi.testclient import TestClient
from app.main import app


def test_health():
    with TestClient(app) as client:
        response = client.get('/api/v1/health')
        assert response.status_code == 200
        assert response.json()['service'] == 'RipenessMeter'


def test_classes():
    with TestClient(app) as client:
        response = client.get('/api/v1/classes')
        assert response.status_code == 200
        assert response.json()['classes'] == ['unripe', 'ripe', 'overripe']


def test_readiness_shape():
    with TestClient(app) as client:
        response = client.get('/api/v1/ready')
        assert response.status_code == 200
        assert isinstance(response.json()['ready'], bool)
