# Changelog - Digital Benefit Sheet
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- Add dropdown to change between hamburger, detailed, and difference only views

## [1.4.0] - 2020-01-28
### Added
- Admins can now filter users

### Changed
- Due to popular request, I changed TMP to an input (instead of a dropdown)
    - Make sure you do not add a "$" to the beginning of the amount, otherwise it will not calculate properly

## [1.3.0] - 2020-01-24
### Added
- Admins now have the ability to sort users

## [1.2.0] - 2020-01-24
### Added
- Admins can now edit users
- Added super admin functionality
    - Super admins can edit and delete other admins
    - They can also change users to admins

## [1.1.0] - 2020-01-21
- First widespread release

### Added
- Added an admin panel
    - The admin panel allows admins to add and remove users
- Added the ability for users to reset their password
    - This is done by sending an email to the user with a link for temporary authorization

### Changed
- Changed the login page layout and style

## [1.0.2] - 2019-11-23
### Fixed
- Fixed the issue where DPP wasn't adding in properly.

## [1.0.1] - 2019-11-21
### Fixed
- The autopay discount was not applying when used in Microsoft Edge. This is now fixed.

## [1.0.0] - 2019-11-18
### Added
- New changelog to accompany the 1.0.0 release
    - New changelog structure
- Added currency formatting
- Added trash can functionality to the Benefit Sheet page
- Added url routing

### Changed
- The plan can now be just a $30 single basic phone plan
- Fixed the trash can to be more reliable
- Changed the data to be in a vuex store for better reliability
- Sessions last longer before logging out

### Removed
- Removed the "Line Access" Section of the plan breakdown