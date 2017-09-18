class Permission:

    def __init__(self, permission, world, server, expires):
        self.permission = permission
        self.world = world
        self.server = server
        self.expires = expires
