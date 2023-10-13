import courseService from '../../src/service/courseService'

describe('courseService', () => {
    const courseServices = new courseService();

    it('should fetch courses', async () => {
        const courses = await courseServices.getCourses();
        expect(courses).toBeDefined();
    });

    it('should fetch a course by ID', async () => {
        const courseId = 20;
        const course = await courseServices.getCourseById(courseId);
        expect(course).toBeDefined();
    });

    it('should create a new course', async () => {
        const newCourse = {
            name: 'CPP',
            description: 'This course is for C++.',
            created_by: 'Rohit',
        };
        const createdCourse = await courseServices.createCourse(
            newCourse.name,
            newCourse.description,
            newCourse.created_by
        );
        expect(createdCourse).toBeDefined();
    });

    it('should update a course', async () => {
        const courseId = 22;
        const updatedCourseData = {
            created_by: 'David',
        };
        await courseServices.updateCourse(courseId, updatedCourseData);
        const updatedCourse = await courseServices.getCourseById(courseId);
        expect(updatedCourse).toBeDefined();
    });

    it('should delete a course', async () => {
        const courseId = 17;
        const courseDeleted = await courseServices.deleteCourse(courseId);
        expect(courseDeleted).toBeDefined();
    });
});
