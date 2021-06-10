import numpy as np
from sklearn.metrics import mean_squared_error
from scipy import optimize


def langmuir(p: np.ndarray, k: float) -> np.ndarray:
    return k * p / (1 + k * p)


def loss(y_true: np.ndarray, p: np.ndarray, parameters: tuple):
    """
    param: y_true has shape (p,T): p is the number of pressure points, T is the number of temperatures
    """
    total_loss = 0
    for meas in range(y_true.shape[1]):
        # here you can pass the parameters as you wish. As there is only one parameter,
        # you would not need a tuple but for more complex functions you would need a tuple
        # or a dict
        total_loss += mean_squared_error(y_true[:, meas], langmuir(p, parameters[0]))
        return total_loss
