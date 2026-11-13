# Authentication and Login Test Cases

These tests cover the reusable authentication setup and the unauthenticated
login page. The setup test provides authenticated browser state to the other
browser projects; tests in the login spec clear that state so each login case
starts at the login page.

**Automation:** [`tests/auth.setup.ts`](../../tests/auth.setup.ts) and
[`tests/login.spec.ts`](../../tests/login.spec.ts)  
**Test data:** [`test-data/users.json`](../../test-data/users.json)

## Authentication setup

| Case ID | Automated behavior | Tags |
| --- | --- | --- |
| `SETUP_01` | Log in with valid credentials and save authenticated browser state | `@smoke`, `@regression` |

## Login

`LOGIN_20` and `LOGIN_21` are additional local cases beyond the source case
sheet.

| Case ID | Automated behavior | Tags |
| --- | --- | --- |
| `LOGIN_01` | Login succeeds with valid credentials | `@smoke`, `@regression` |
| `LOGIN_02` | Login rejects an invalid username | `@regression` |
| `LOGIN_03` | Login rejects an invalid password | `@regression` |
| `LOGIN_04` | Login handles an emoji in the username | `@regression` |
| `LOGIN_06` | Login reports an empty username | `@regression` |
| `LOGIN_07` | Login reports an empty password | `@regression` |
| `LOGIN_08` | Login rejects a username with internal spaces | `@regression` |
| `LOGIN_09` | Login rejects a username with leading or trailing spaces | `@regression` |
| `LOGIN_12` | Login rejects a username with different casing | `@regression` |
| `LOGIN_13` | Login rejects a password with different casing | `@regression` |
| `LOGIN_15` | Password input is masked | `@regression` |
| `LOGIN_16`, `LOGIN_17` | Username and password placeholders are displayed | `@regression` |
| `LOGIN_18` | Login page core elements are displayed | `@regression` |
| `LOGIN_19` | Login error message can be dismissed | `@regression` |
| `LOGIN_20` | Login handles a long username | `@regression` |
| `LOGIN_21` | Login handles a Unicode username | `@regression` |

The cases check user-visible outcomes such as navigation to inventory, error
messages, password masking, and the presence of the login form. Input examples
and expected error text are maintained in `test-data/users.json`.

## Source case sheet

[Login test cases](https://docs.google.com/spreadsheets/d/1DX2x2gwdaCFflPbLz8OHMOTogpTMFxzzHBygFTTrsHQ/edit?usp=sharing)